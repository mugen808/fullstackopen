import reducer from './anecdoteReducer'

describe('noteReducer', () => {
  test('an anecdote can be upvoted', () => {
    const state = [
      {
        content: 'anecdote1',
        id: 1,
        votes: 0
      },
      {
        content: 'anecdote2',
        id: 2,
        votes: 0,
      }
    ]
    const action = {
      type: 'UPVOTE',
      payload: {
        id: 2
      }
    }

    const newAnecdote = reducer(state, action)

    expect(newAnecdote).toHaveLength(2)
    expect(newAnecdote).toContainEqual(state[0])
    expect(newAnecdote).toContainEqual(
      {
        content: 'anecdote2',
        id: 2,
        votes: 1,
      }
    )
  })
  test('a new note can be added', () => {
    const state = [
      {
        content: 'anecdote1',
        id: 1,
        votes: 0
      },
      {
        content: 'anecdote2',
        id: 2,
        votes: 0,
      }
    ]
    const action = {
      type: 'NEW_ANECDOTE',
      payload: {
        content: 'anecdote2',
        id: 3,
        votes: 0,
      }
    }
    const addAnecdote = reducer(state, action)

    expect(addAnecdote).toHaveLength(3)
    expect(addAnecdote).toContainEqual(action.payload)
  })
})