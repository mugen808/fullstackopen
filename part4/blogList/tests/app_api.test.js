const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const config = require('../utils/config')
const Blog = require('../models/blog')
const api = supertest(app)
const helper = require('./test_helper')
const blog = require('../models/blog')


beforeAll(async () => {
  const url = config.MONGO_URI
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
})

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
  // const blogEntries = helper.initialBlogs.map(blog => new Blog(blog))
  // const promiseArray = blogEntries.map(blog => blog.save())
  // await Promise.all(promiseArray)
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
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
  
  test('blogs identifier is id instead of _id', async () => {
    const initialBlogs = await api.get('/api/blogs')
  
    expect(initialBlogs.body[0].id).toBeDefined()
  })
  


  test('if specific previously added data is correct', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)
    expect(contents).toContain('Cat Zest')
  })
  
})

describe('viewing a specific blog', () => {
  test('a specific blog can be found with a valid id', async () => {
    const initialBlogs = await helper.notesInDb()
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
    const newBlog = {
      title: 'Third second Best Blog',
      author: 'Ferrys Night',
      url: 'http://2ndbestblo.com',
      likes: 22
    }
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const notesAfter = await helper.notesInDb()
    expect(notesAfter).toHaveLength(helper.initialBlogs.length + 1)
    const contents = notesAfter.map(res => res.title)
    expect(contents).toContain(newBlog.title)
  })

  test('error 400 if missing required data', async () => {
    const newBlog = {
      author: 'Sebas Stian',
      likes: 30
    }
    
    await api.post('/api/blogs').send(newBlog).expect(400)
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('if Likes property is missing, default value is 0', async () => {
    const newBlog = {
      title: 'Third second Best Blog',
      author: 'Ferrys Night',
      url: 'http://2ndbestblo.com',
    }
  
    const blogToCheck = { ...newBlog, likes: 0 }
    await api.post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const notesAfter = await helper.notesInDb()
    expect(notesAfter[2].likes).toBe(0)
  })
})

describe('deleting a blog', () => {
  test('succeeds with 204 status if id is valid', async () => {
    const blogList = await helper.notesInDb()
    const toBeDeleted = blogList[0]
    await api.delete(`/api/blogs/${toBeDeleted.id}`).expect(204)
  
    const updatedList = await helper.notesInDb()
  
    expect(updatedList).toHaveLength(blogList.length -1)
  })
})

describe('updating a blog entry', () => {
  test('updates the number of likes', async () => {
    const initalList = await api.get('/api/blogs')
    const blogToUpdate = initalList.body[0]
    const updatedBlog = {...blogToUpdate, likes: 100}

    await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedBlog).expect(200)
    const updatedList = await api.get('/api/blogs')
    const listToCheck = updatedList.body.map(blog => blog.likes)

    expect(listToCheck).toContain(100)
  })
})

afterAll(() => {
  mongoose.connection.close()
})