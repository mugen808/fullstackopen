const clearNotification = () => {
  return {
    type: '@notifications/clear',
    payload: {
      message: '',
      kind: 'clear',
    }
  }
}
export const newNotification = (message, duration, timeoutId) => {

  return async dispatch => {
    clearTimeout(timeoutId)
    const timeout = setTimeout(() => {
      dispatch(clearNotification())
    }, duration * 1000)
    dispatch({ type: '@notifications/create_new', payload: { message, kind: 'create', timeout } })
  }
}

const notificationReducer = (state = {}, { type, payload }) => {
  switch(type) {
    case '@notifications/create_new':
      return { ...state, message: payload.message, kind: 'create', timeout: payload.timeout }
    case '@notifications/clear':
      return { ...state, message: payload.message, kind: 'clear' }
  }
  return state
}

export default notificationReducer