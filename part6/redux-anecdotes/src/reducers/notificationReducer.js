const initialState = {
  message: 'Initial notification',
  kind: 'create'
}

export const newAnecdoteNotification = (message) => {
  return {
    type: '@notifications/create_new',
    payload: {
      message,
      kind: 'create'
    }
  }
}
export const upvoteNotification = (message) => {
  return {
    type: '@notifications/upvote',
    payload: {
      message,
    }
  }
}

export const clearNotification = () => {
  return {
    type: '@notifications/clear',
    payload: {
      message: '',
      kind: 'clear'
    }
  }
}

const notificationReducer = (state = {}, { type, payload }) => {
  switch(type) {
    case '@notifications/create_new':
      return { ...state, message: payload.message, kind: 'create' }
    case '@notifications/upvote':
      return { ...state, message: payload.message, kind: 'upvote' }
    case '@notifications/clear':
      return { ...state, message: payload.message, kind: 'clear' }
  }
  return state
}

export default notificationReducer