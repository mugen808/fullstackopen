const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const config = require('../utils/config')
const Blog = require('../models/blog')
const api = supertest(app)
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')



beforeAll(async () => {
  const url = config.MONGO_URI
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
})

describe('when there is one user in the db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
  
    const passwordHash = await bcrypt.hash('contrasenya', 10)
    const user = new User({ username: 'paysegun', passwordHash})
  
    await user.save()
  })

  test('a valid user can be created', async () => {
    const users = await helper.usersInDb()

    const newUser = {
      username: 'hitmon',
      name: 'Lee Hitmon',
      password: 'twogoose'
    }
    await api.post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const usersAfterPost = await helper.usersInDb()
    console.log(usersAfterPost)
    expect(usersAfterPost).toHaveLength(users.length + 1)

    const usernames = usersAfterPost.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('an invalid user cannot be created', async () => {
    const users = await helper.usersInDb()

    const newUser = {
      username: 'Ab',
      name: 'Abraham Lincoln',
      password: 'isasdasdas'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
    
    const errorMessage = await api.post('/api/users').send(newUser)
    
    const afterList = await helper.usersInDb()
    expect(afterList).toHaveLength(users.length)
    expect(errorMessage.body.error).toBe(
      'User validation failed: username: Path `username` (`Ab`) is shorter than the minimum allowed length (3).'
    )
  })
})

afterAll(() => {
  mongoose.connection.close()
})