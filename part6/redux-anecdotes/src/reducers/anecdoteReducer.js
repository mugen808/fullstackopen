import anecdotesServices from '../services/anecdotesServices'

export const newAnecdote = (anecdote) => {
  return async dispatch => {
    const newEntry = await anecdotesServices.createNew(anecdote)
    dispatch({
      type: 'NEW_ANECDOTE',
      payload: newEntry
    })
  }
}

export const initAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesServices.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      payload: anecdotes
    })
  }
}

export const upvoteAnecdote = (id) => {
  return async dispatch => {
    await anecdotesServices.upvoteAnecdote(id)
    dispatch({
      type: 'UPVOTE',
      payload: { id }
    })
  }
}

// export const upvoteAnecdote = (id) => {
//   return {
//     type: 'UPVOTE',
//     payload: {
//       id: id
//     }
//   }
// }

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'INIT_ANECDOTES':
      return action.payload
    case 'NEW_ANECDOTE':
      return [...state, action.payload]

    case 'UPVOTE':
      const id = action.payload.id
      const upvoted = {...state.find(anec => anec.id === id)}
      upvoted.votes += 1
      return state.map(anec => anec.id === id ? upvoted : anec)
  }

  return state
}

export default anecdoteReducer