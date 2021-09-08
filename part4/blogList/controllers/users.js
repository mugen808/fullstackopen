const usersRouter = require('express').Router()
const logger = require('../utils/logger')
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  logger.info('Here we are')
  const users = await User.find({}).populate('blogs', { title: 1, likes: 1 })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  logger.info('here i am rocking like an hurricane')
  const body = request.body

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })

  const savedUser = await user.save()
  
  response.json(savedUser)
})

module.exports = usersRouter