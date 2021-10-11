import { newAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { newNotification } from '../reducers/notificationReducer'


const Form = () => {
  const dispatch = useDispatch()

  const addNew = async (e) => {
    e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(newAnecdote(content))
    dispatch(newNotification(`New message: '${content}'`, 3))

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