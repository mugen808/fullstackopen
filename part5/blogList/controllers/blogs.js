const blogsRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')
const Blog = require('../models/blog')
const { userExtractor } = require('../middleware/userExtractor')


blogsRouter.get('/', async (request, response) => {
  const results = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(results)
})

blogsRouter.get('/:id', async (request, response) => {
  const id = request.params.id
  const searchBlog = await Blog.findById(id)
  if (!searchBlog) {
    response.status(404).end()
  }
  response.json(searchBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const id = request.params.id
  const { user } = await Blog.findById(id)

  if (user.toString() === request.id) {
    await Blog.findByIdAndRemove(id)
    return response.status(204).end()
  }
  response.status(401).json({ error: "user not allowed to delete post" })
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body
  const user = await User.findById(request.id)
  const newBlog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  }
  const blog = new Blog(newBlog)
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.json(savedBlog)
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const id = request.params.id
  const body = request.body
  const blogToUpdate = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const { user } = await Blog.findById(id)

  if (user.toString() === request.id) {
    const updatedBlog = await Blog.findByIdAndUpdate(id, blogToUpdate, { new: true })
    return response.json(updatedBlog)
  }
  response.status(401).json({ error: "user not allowed to modify post" })
})

module.exports = blogsRouter