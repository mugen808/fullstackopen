require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')
const mongoose = require('mongoose')
app.use(express.static('build'))
app.use(express.json())
app.use(cors())

morgan.token('showcontent', (req, res) => {
  const content = JSON.stringify(req.body) || null
  console.log(`Server running on port ${PORT}`)
  return content
})
app.use(
  morgan(
    ':method :url :status :res[content-length] :response-time ms :showcontent'
  )
)

app.get('/api/persons', (request, response) => {
  Person.find({})
    .then(result => {
      response.json(result)
    })
    .catch(err => err)
})

app.get('/info', (request, response) => {
  const date = new Date()
  Person.find({}).then(result => {
    response.send(`The phonebook has ${result.length} entries. \n ${date}`)
    mongoose.connection.close()
  })
})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findById(id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end('Not found')
      }
    })
    .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body
  const person = new Person({
    name: body.name,
    number: body.number
  })

  if (!body.name || !body.number) {
    response.status(400).send({ error: 'Name and number are mandatory' })
  } else {
    person
      .save()
      .then(newPerson => {
        response.json(newPerson)
      })
      .catch(err => next(err))
  }
})

app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndRemove(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(err => next(err))
})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  const id = request.params.id
  const updatePerson = {
    number: body.number
  }
  Person.findByIdAndUpdate(id, updatePerson, { new: true })
    .then(updatedPerson => {
      response.json(updatedPerson)
    })
    .catch(err => next(err))
})

const deadEnd = (request, response) => {
  response.status(404).send({ error: 'Unknown endpoint' })
}

app.use(deadEnd)

const handleErrors = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).send({
      error: error.message
    })
  }
  return response
    .status(400)
    .send({ error: 'This name is already in the phonebook' })
}

app.use(handleErrors)
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
