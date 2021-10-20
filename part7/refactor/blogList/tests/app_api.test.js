const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const config = require('../utils/config')
const Blog = require('../models/blog')
const User = require('../models/user')
const api = supertest(app)
const helper = require('./test_helper')

const addingUser = async () => {
  const response = await api.post('/api/users').send(helper.initialUsers[0]).expect(200)
  return response.body
}

const loggingUser = async () => {
  const user = { 
    username: helper.initialUsers[0].username,
    password: helper.initialUsers[0].password
  }
  const login = await api.post('/api/login').send(user).expect(200)
  return login.body
}

const addingBlog = async (blog, expect) => {
  const handler = expect ? expect : 200
  const { token } = await loggingUser()                                                    
  const users = await helper.usersInDb()
  const newBlog = { ...blog, user: users[0].id }
  const response = await api.post('/api/blogs').set('Authorization', `bearer ${token}`).send(newBlog).expect(handler)
  return response.body
}

beforeAll(async () => {
  const url = config.MONGO_URI
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
})

beforeEach(async () => {
  await User.deleteMany({})
  await addingUser()
  await Blog.deleteMany({})
  await addingBlog(helper.initialBlogs[0])
})

describe('when there are blogs previously added in the db', () => {
  test('blogs are returned as a JSON', async () => {  
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length - 1)
  })
  
  test('blogs identifier is id instead of _id', async () => {
    const initialBlogs = await api.get('/api/blogs')
  
    expect(initialBlogs.body[0].id).toBeDefined()
  })
  
  test('if specific previously added data is correct', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)
    expect(contents).toContain('Second Best Blog')
  })
  
})

describe('viewing a specific blog', () => {
  test('a specific blog can be found with a valid id', async () => {
    const initialBlogs = await helper.blogsInDb()
    const blogToCheck = initialBlogs[0]
    const searchBlog = await api.get(`/api/blogs/${initialBlogs[0].id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const processedBlogToCheck = JSON.parse(JSON.stringify(blogToCheck))
    expect(searchBlog.body).toEqual(processedBlogToCheck)
  })
})

describe('adding a new blog', () => {
  test('a valid note can be added', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const newBlog = {
      title: 'Third second Best Blog',
      author: 'Ferrys Night',
      url: 'http://2ndbestblo.com',
      likes: 22
    }
    await addingBlog(newBlog)
    const notesAfter = await helper.blogsInDb()
    expect(notesAfter).toHaveLength(blogsAtStart.length + 1)
    const contents = notesAfter.map(res => res.title)
    expect(contents).toContain(newBlog.title)
  })

  test('error 400 if missing required data', async () => {
    const newBlog = {
      author: 'Sebas Stian',
      likes: 30
    }
    
    await addingBlog(newBlog, 400)
    const response = await helper.blogsInDb()
    expect(response).toHaveLength(helper.initialBlogs.length - 1)
  })

  test('if Likes property is missing, default value is 0', async () => {

    const blogsBefore = await helper.blogsInDb()
    const newBlog = {
      title: 'Third second Best Blog',
      author: 'Ferrys Night',
      url: 'http://2ndbestblo.com',
    }
    const addedBlog = await addingBlog(newBlog)
    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter).toHaveLength(blogsBefore.length + 1)
    expect(addedBlog.likes).toBe(0)
  })

  test('error 401 if token is not provided', async () => {
    const blogsBefore = await helper.blogsInDb()
    const newBlog = {
      title: 'Third second Best Blog',
      author: 'Ferrys Night',
      url: 'http://2ndbestblo.com',
    }
    await api.post('/api/blogs').send(newBlog).expect(401)
    const blogsAfter = await helper.blogsInDb()
    expect(blogsAfter).toHaveLength(blogsBefore.length)

  })
})

describe('deleting a blog', () => {
  test('succeeds with 204 status if id is valid', async () => {
    const user = await loggingUser()

    const blogList = await helper.blogsInDb()
    const toBeDeleted = blogList[0]
    await api.delete(`/api/blogs/${toBeDeleted.id}`).set('Authorization', `bearer ${user.token}`).expect(204)
  
    const updatedList = await helper.blogsInDb()
  
    expect(updatedList).toHaveLength(blogList.length -1)
  })
})

describe('updating a blog entry', () => {
  test('updates the number of likes', async () => {
    const user = await loggingUser()
    const initalList = await helper.blogsInDb()
    const blogToUpdate = initalList[0]
    const updatedBlog = {...blogToUpdate, likes: 100}
    await api.put(`/api/blogs/${blogToUpdate.id}`).set('Authorization', `bearer ${user.token}`).send(updatedBlog).expect(200)
    const updatedList = await helper.blogsInDb()

    expect(updatedList[0].likes).toBe(100)
  })
})

afterAll(() => {
  mongoose.connection.close()
})