import React, { useEffect } from 'react'
import Form from './components/AnecdoteForm'
import Anecdotes from './components/AnecdotesLists'
import anecServices from './services/anecdotesServices'
import { useDispatch } from 'react-redux'
import { initAnecdote } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecServices.getAll().then(anecdotes => dispatch(initAnecdote(anecdotes)))
  }, [dispatch])
  return (
    <div>
      <Anecdotes />
      <Form />
    </div>
  )
}

export default App