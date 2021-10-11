import React, { useEffect } from 'react'
import Form from './components/AnecdoteForm'
import Anecdotes from './components/AnecdotesLists'
import { useDispatch } from 'react-redux'
import { initAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initAnecdotes())
  }, [dispatch])
  return (
    <div>
      <Anecdotes />
      <Form />
    </div>
  )
}

export default App