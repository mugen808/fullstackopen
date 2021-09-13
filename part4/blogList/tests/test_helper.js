const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)

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

const initialUsers = [
  {
    "blogs": [],
    "username": "kalani",
    "name": "Kalani Brown",
    "password": "salainen"
  },
  {
    "blogs": [],
    "username": "salami",
    "name": "Salami Brown",
    "password": "salamiforya"
  }
]

//REMEMBER TO ADD USER TO BLOG!!
const addingUser = async () => {
  const response = await api.post('/api/users').send(initialUsers[0])
  return response
}

const loggingUser = async () => {
  const user = { 
    username: initialUsers[0].username,
    password: initialUsers[0].password
  }
  const login = await api.post('/api/login').send(user)
  return login
}

const addingBlog = async () => {
  const { token } = loggingUser(api)
  const { id } = usersInDb()
  const newBlog = { ...initialBlogs[1], user: id }
  const response = await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog)

  return response
}

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

module.exports = { 
  nonExistingId,
  blogsInDb,
  initialBlogs,
  usersInDb,
  addingUser,
  loggingUser,
  addingBlog,
  initialUsers
}