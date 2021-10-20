import React from 'react'
import { useSelector } from 'react-redux'

const ErrorMessage = () => {
  const { message, kind } = useSelector(store => store.notifications)

  const style = {
    border: '5px solid black',
    borderRadius: '5px',
    padding: '5px',
    background: 'lightgray'
  }

  if (kind === 'create') {
    return (
      <div style={style}>
        {message}
      </div>)
  }

  return null
}

export default ErrorMessage