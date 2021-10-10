

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}
// const initialState = anecdotesAtStart.map(anec => asObject(anec))

export const newAnecdote = (anecdote) => {
  return {
    type: 'NEW_ANECDOTE',
    payload: asObject(anecdote)
  }
}

export const initAnecdote = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    payload: anecdotes
  }
}

export const upvoteAnecdote = (id) => {
  return {
    type: 'UPVOTE',
    payload: {
      id: id
    }
  }
}

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