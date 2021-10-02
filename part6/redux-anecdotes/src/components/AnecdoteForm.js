import { newAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'


const Form = () => {
  const dispatch = useDispatch()

  const addNew = (e) => {
    e.preventDefault()

    const createAnecdote = (anecdote) => {
      dispatch(newAnecdote(anecdote))
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