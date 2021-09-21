import React, { useState } from 'react'
import loginServices from '../services/login'
import blogServices from '../services/blogs'
import Toggleable from './Toggleable'

const Login = ({ setUser, setErrorMessage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginServices({ username, password })
      blogServices.setToken(user.token)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
      setUser(user)

    } catch(e) {
      setErrorMessage({ message: 'Invalid username or password', color: 'red' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
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
