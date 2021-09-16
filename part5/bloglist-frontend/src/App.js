import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Form from './components/Form'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    async function getBlogs() {
      const blogs = await blogService.getAll()
      setBlogs(blogs)  
    }
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  return (
    <div>
      <Form 
        setUsername={setUsername} 
        setPassword={setPassword} 
        username={username} 
        password={password} 
        user={user} 
        setUser={setUser} 
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        blogs={blogs}
      />
    </div>
  )
}

export default App