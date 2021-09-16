import React from 'react'

const ErrorMessage = ({ errorMessage }) => {
  if (errorMessage) {
    
    const style = {
      border: `5px solid ${errorMessage.color}`,
      borderRadius: '5px',
      padding: '5px',
      background: 'lightgray'
    }

    return (
      <div>
        <p style={style}>{errorMessage.message}</p>
      </div>
    )
  }
  return null
}

export default ErrorMessage