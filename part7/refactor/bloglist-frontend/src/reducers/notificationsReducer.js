export const newNotification = (message) => {
  return async dispatch => {
    dispatch({
      type: '@notifications/new_message',
      payload: {
        message,
        kind: 'create'
      }
    })
    setTimeout(() => {
      dispatch(clearNotification())
    }, 3000)
  }
}

export const clearNotification = () => {
  return {
    type: '@notifications/clear_alert',
    payload: {
      message: '',
      kind: 'clear'
    }
  }
}

const notificationsReducer = (state = {}, { type, payload }) => {
  switch (type) {
  case '@notifications/new_message':
    return payload
  case '@notifications/clear_alert':
    return payload
  }
  return state
}

export default notificationsReducer