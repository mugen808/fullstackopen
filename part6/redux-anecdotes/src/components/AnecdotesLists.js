import { useSelector, useDispatch } from 'react-redux'
import Notification from './Notification'
import Filter from './Filter'
import { clearNotification, upvoteNotification } from '../reducers/notificationReducer'
import { upvoteAnecdote } from '../reducers/anecdoteReducer'


const Anecdotes = () => {
  const dispatch = useDispatch()

  const { filter } = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes.sort((a, b) => b.votes - a.votes))
  const filteredList = anecdotes.filter(entry => entry.content.toLowerCase().includes(filter.toLowerCase()))

  const vote = (id, content) => {
    dispatch(upvoteAnecdote(id))
    dispatch(upvoteNotification(content))
    setTimeout(() => {
      dispatch(clearNotification())
    }, 3000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <ul>
        {filteredList.map(anecdote =>
          <li key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Anecdotes