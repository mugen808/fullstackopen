import React from "react"

const Notification = ({ notification }) => {
  const style = {
    border: '2px solid black',
    padding: '5px',
    marginTop: '10px'
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification