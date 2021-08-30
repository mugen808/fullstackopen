const cors = require('cors')
const http = require('http')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')

const url = config.MONGO_URI

logger.info('blog: ', Blog)

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


app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
})
