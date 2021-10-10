import { useSelector } from 'react-redux'
import React from 'react'

const Notification = () => {
  const { message, kind } = useSelector(state => state.notifications)

  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: 'none'
  }

  if (kind === 'upvote') {
    style.display = ''
    return (
      <div style={style}>
        One upvote for '{message}'
      </div>
    )
  }
  if (kind === 'create') {
    style.display = ''
    return (
      <div style={style}>
        Message created! '{message}''
      </div>
    )
  }
  return null
}

export default Notification