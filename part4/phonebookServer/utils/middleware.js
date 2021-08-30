const { request } = require('express')
const logger = require('./logger')
const config = require('./config')
const morgan = require('morgan')

morgan.token('showcontent', (request, response) => {
  const content = JSON.stringify(request.body) || null
  logger.info(`Server running on port ${config.PORT}`)
  return content
})

const requestLogger =   morgan(':method :url :status :res[content-length] :response-time ms :showcontent')

const deadEnd = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
}

const handleErrors = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({
      error: error.message
    })
  } else {
    return response.status(400).send({
      error: 'Name must be unique'
    })
  }
  next(error)
}

module.exports = {
  requestLogger,
  deadEnd,
  handleErrors
}