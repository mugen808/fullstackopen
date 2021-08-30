const personsRouter = require('./controllers/persons')
const express = require('express')

const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const middleware = require('./utils/middleware')
app.use(express.static('build'))
app.use(express.json())
app.use(cors())


app.use(middleware.requestLogger)

mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(result => {
    console.log('Connected to MongoDB')
  })
  .catch(err => console.log('Error connecting to MongoDB: ', err))


app.use('/api/persons', personsRouter)

app.use(middleware.deadEnd)

app.use(middleware.handleErrors)
const PORT = config.PORT
app.listen(PORT, () => {
  logger.info(`Server running on ${PORT}`)
})
