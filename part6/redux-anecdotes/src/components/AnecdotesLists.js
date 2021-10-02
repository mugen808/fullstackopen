import { useSelector, useDispatch } from 'react-redux'

const Anecdotes = () => {
  const anecdotes = useSelector(state => state.sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch({
      type: 'UPVOTE',
      payload: {
        id: id
      }
    })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote =>
          <li key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </li>
        )}
      </ul>
    </div>
  )
}

export default Anecdotes