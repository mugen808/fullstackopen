import { connect } from 'react-redux'
import React from 'react'

const Notification = (props) => {

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    display: 'none'
  }

  const notificationToShow = () => {
    if (props.notifications.kind === 'create') {
      style.display = ''
      return (
        <div style={style}>
          {props.notifications.message}
        </div>
      )
    }
    return null
  }
  
  return (
    notificationToShow()
  )

}

const mapStateToProps = (state) => {
  return {
    notifications: state.notifications
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)

export default ConnectedNotification