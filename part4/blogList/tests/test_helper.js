const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Second Best Blog',
    author: 'John Day',
    url: 'http://2ndbestblo.com',
    likes: 13
  },
  {
    title: 'Cat Zest',
    author: 'Serel Kabrei',
    url: 'http://serelkabrei.co.uk',
    likes: 22
  }
]

const nonExistingId = async () => {
  const newBlog = {
    title: 'Bat Rest',
    author: 'Lerei Iekkar',
    url: 'http://serelkabrei.co.uk',
    likes: 22
  }
  const blog = new Blog(newBlog)
  await blog.save()
  await blog.remove()
  
  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  blogs.map(blog => blog.toJSON())
  return blogs
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

module.exports = { nonExistingId, blogsInDb, initialBlogs, usersInDb }