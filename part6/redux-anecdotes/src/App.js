import React from 'react'
import Form from './components/AnecdoteForm'
import Anecdotes from './components/AnecdotesLists'

const App = () => {
  return (
    <div>
      <Anecdotes />
      <Form />
    </div>
  )
}

export default App