import React from 'react'
import loginServices from '../services/login'
import blogServices from '../services/blogs'

const Login = ({ setUsername, setPassword, username, password, setUser, setErrorMessage }) => {
  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginServices({ username, password })
      blogServices.setToken(user.token)
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(e) {
      setErrorMessage({ message: 'Wrong credentials!', color: 'red'})
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }
  
  return (
    <div>
      <form onSubmit={handleLogin}>
        <div>
          <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login