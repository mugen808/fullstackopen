import React, { useState } from 'react'
import Toggleable from './Toggleable'
import { useDispatch } from 'react-redux'
import { newNotification } from '../reducers/notificationsReducer'
import { userLogIn } from '../reducers/userReducer'

const Login = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      dispatch(userLogIn({ username, password }))
      setUsername('')
      setPassword('')

    } catch(e) {
      dispatch(newNotification('Invalid username or password'))
    }
  }

  return (
    <Toggleable buttonLabel='Login'>
      <form onSubmit={handleLogin}>
        <div>
          <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </Toggleable>
  )
}

export default Login
