import React, { useState, useEffect } from 'react'
import blogServices from '../services/blogs'
import Login from './Login'
import LoggedIn from './LoggedIn'
import Error from './Error'

const Form = () => {
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogServices.setToken(user.token)
    }
  }, [])

  if (!user) {
    return (
      <div>
        <Error errorMessage={errorMessage} />
        <Login

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
      />
    </div>
  )

}

export default Form