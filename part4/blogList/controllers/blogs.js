const blogsRouter = require('express').Router()
const logger = require('../utils/logger')
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const results = await Blog.find({})
  response.json(results)
})

blogsRouter.get('/:id', async (request, response) => {
  console.log('get id starts')
  const id = request.params.id
  const searchBlog = await Blog.findById(id)
  if (!searchBlog) {
    response.status(404).end()
  }
  console.log('id: ', id, 'search blog: ', searchBlog);
  response.json(searchBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  console.log('delete triggered')
  const id = request.params.id
  Blog.findByIdAndRemove(id)
  response.status(204).end()
})

blogsRouter.post('/', async (request, response) => {
    const newBlog = {
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes
    }
    const blog = new Blog(newBlog)
    const savedBlog = await blog.save()
    response.json(savedBlog)
})

module.exports = blogsRouter