import { newAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { newAnecdoteNotification, clearNotification } from '../reducers/notificationReducer'


const Form = () => {
  const dispatch = useDispatch()

  const addNew = (e) => {
    e.preventDefault()

    const createAnecdote = (anecdote) => {
      dispatch(newAnecdote(anecdote))
      dispatch(newAnecdoteNotification(anecdote))
      setTimeout(() => {
        dispatch(clearNotification())
      }, 3000)
    }

    const input = e.target.anecdote.value
    e.target.anecdote.value = ''
    createAnecdote(input)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <input name='anecdote'/>
        <button>create</button>
      </form>
    </div>
  )
}

export default Form