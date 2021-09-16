import React, { useState } from 'react'
import Login from './Login'
import LoggedIn from './LoggedIn'
import Error from './Error'

const Form = ({ setUsername, setPassword, username, password, user, setUser, errorMessage, setErrorMessage, blogs }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })
  
  if (!user) {
    return (
      <div>
        <Error errorMessage={errorMessage} />
        <Login
        setUsername={setUsername} 
        setPassword={setPassword} 
        username={username} 
        password={password} 
        setUser={setUser}
        setErrorMessage={setErrorMessage}
        />
    </div>
    )
  }
  return (
    <div>
      <Error errorMessage={errorMessage} />
      <LoggedIn 
      user={user} 
      setUser={setUser} 
      setErrorMessage={setErrorMessage}
      blogs={blogs}
      newBlog={newBlog}
      setNewBlog={setNewBlog}
      />
    </div>
  )

}

export default Form