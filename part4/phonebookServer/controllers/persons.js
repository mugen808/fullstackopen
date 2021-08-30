const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (request, response) => {
  Person.find({})
    .then(result => {
      response.json(result)
    })
    .catch(err => err)
})

personsRouter.get('/info', (request, response) => {
  const date = new Date()
  Person.find({}).then(result => {
    response.send(`The phonebook has ${result.length} entries. \n ${date}`)
    mongoose.connection.close()
  })
})

personsRouter.get('/:id', (request, response, next) => {
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

personsRouter.post('/', (request, response, next) => {
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

personsRouter.delete('/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndRemove(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(err => next(err))
})

personsRouter.put('/:id', (request, response, next) => {
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

module.exports = personsRouter