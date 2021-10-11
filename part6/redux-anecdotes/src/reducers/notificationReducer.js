const clearNotification = () => {
  return {
    type: '@notifications/clear',
    payload: {
      message: '',
      kind: 'clear'
    }
  }
}
export const newNotification = (message, duration) => {
  return async dispatch => {
    dispatch({ type: '@notifications/create_new', payload: { message, kind: 'create' } })
    await setTimeout(() => {
      dispatch(clearNotification())
    }, duration * 1000);
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