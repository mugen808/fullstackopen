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
})

afterAll(() => {
  mongoose.connection.close()
})