const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/api/blogs', (request, response) => {
  Blog.find({}).then(items => {
    logger.info('items found: ', items)
    response.json(items)
  }).catch(err => {
    logger.error('error at get: ', err)
  })
})

blogsRouter.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then(result => {
    logger.info('Saved correctly! Response: ', result)
    response.json(result)
  }).catch(err => {
    logger.error('Error found on post: ', err)
  })
})

module.exports = blogsRouter