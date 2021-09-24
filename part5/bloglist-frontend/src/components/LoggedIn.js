import React, { useState, useEffect } from 'react'
import blogServices from '../services/blogs'
import Blog from './Blog'
import BlogForm from './BlogForm'


const LoggedIn = ({ user, setUser, setErrorMessage }) => {
  const [blogs, setBlogs] = useState([])
  const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes)
  useEffect(() => {
    async function getBlogs() {
      const blogs = await blogServices.getAll()
      setBlogs(blogs)
    }
    getBlogs()
  }, [])

  const handleLogOut = async () => {
    window.localStorage.clear()
    setUser(null)
    blogServices.setToken(null)
  }

  return (
    <div>
      <h3>Hello, {user.name}</h3>
      <button onClick={handleLogOut}>Logout</button>
      <h4>Create a new Blog</h4>
      <BlogForm setErrorMessage={setErrorMessage} setBlogs={setBlogs} />
      <h2>blogs</h2>
      {sortedBlogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          setBlogs={setBlogs}
          user={user}
        />
      )}
    </div>
  )
}

export default LoggedIn