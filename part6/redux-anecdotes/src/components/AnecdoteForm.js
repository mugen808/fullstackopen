import { newAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { newAnecdoteNotification, clearNotification } from '../reducers/notificationReducer'
import anecdotesServices from '../services/anecdotesServices'


const Form = () => {
  const dispatch = useDispatch()

  const addNew = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(newAnecdote(content))
    anecdotesServices.createNew(content)
    dispatch(newAnecdoteNotification(content))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 3000)
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