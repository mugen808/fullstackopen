const blogsRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  logger.info('GET Starts')
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

blogsRouter.delete('/:id', async (request, response) => {
  const id = request.params.id
  await Blog.findByIdAndRemove(id)
  response.status(204).end()
})

blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const user = await User.findById(body.user)
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

blogsRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const body = request.body
  const blogToUpdate = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(id, blogToUpdate, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter