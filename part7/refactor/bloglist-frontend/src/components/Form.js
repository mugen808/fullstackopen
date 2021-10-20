import React, { useEffect } from 'react'
import Login from './Login'
import LoggedIn from './LoggedIn'
import Notification from './Notification'
import { useSelector, useDispatch } from 'react-redux'
import { userLogged } from '../reducers/userReducer'

const Form = () => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUser) {
      dispatch(userLogged(loggedUser))
    }
  }, [])

  if (!user.loggedIn) {
    return (
      <div>
        <Notification />
        <Login />
      </div>
    )
  }
  return (
    <div>
      <Notification />
      <LoggedIn />
    </div>
  )

}

export default Form