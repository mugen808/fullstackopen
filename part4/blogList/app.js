const cors = require('cors')
const express = require('express')
require('express-async-errors')
const app = express()
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const url = config.MONGO_URI


mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(response => {
  logger.info('Connected to mongoose')
}).catch(err => {
  logger.error('Error: ', err)
})

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)

app.use((err, req, res, next) => {
  if (err) {
    console.log('error is: ', err)
    res.status(400).send({ error: 'Something went wrong'})
  }
})
// app.listen(config.PORT, () => {
//   logger.info(`Server running on port ${config.PORT}`)
// })


module.exports = app