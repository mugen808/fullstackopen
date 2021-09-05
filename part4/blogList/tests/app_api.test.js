const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const config = require('../utils/config')
const Blog = require('../models/blog')
const api = supertest(app)
const helper = require('./test_helper')


beforeAll(async () => {
  const url = config.MONGO_URI
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
})

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('cleared db')
  let newBlog = new Blog(helper.initialBlogs[0])
  await newBlog.save()
  console.log('1st entry')
  newBlog = new Blog(helper.initialBlogs[1])
  await newBlog.save()
  console.log('2nd entry')
  console.log('mongoose state: ', mongoose.connection.readyState)
})

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

test(`there's a blog called Cat Zest`, async () => {
  const response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.title)
  expect(contents).toContain('Cat Zest')
})

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
  // const response = await api.get('/api/blogs')
  const contents = notesAfter.map(res => res.title)
  // expect(contents).toHaveLength(helper.initialBlogs.length + 1)
  expect(contents).toContain(newBlog.title)
})

test('empty note will not be added', async () => {
  const newBlog = {
    author: 'Sebas Stian',
    likes: 30
  }
  
  await api.post('/api/blogs').send(newBlog).expect(400)
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog can be found by id', async () => {
  const initialBlogs = await helper.notesInDb()
  const blogToCheck = initialBlogs[0]
  const searchBlog = await api.get(`/api/blogs/${initialBlogs[0].id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const processedBlogToCheck = JSON.parse(JSON.stringify(blogToCheck))
  expect(searchBlog.body).toEqual(processedBlogToCheck)
})

test('a blog can be deleted', async () => {
  const blogList = await helper.notesInDb()
  const toBeDeleted = blogList[0]
  console.log(toBeDeleted)
  await api.delete(`/api/blogs/${toBeDeleted.id}`).expect(204)

  const updatedList = await helper.notesInDb()

  expect(updatedList).toHaveLength(blogList.length -1)
})

afterAll(() => {
  mongoose.connection.close()
})