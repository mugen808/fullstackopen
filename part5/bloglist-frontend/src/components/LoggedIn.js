import React from 'react'
import blogServices from '../services/blogs'
import Blog from './Blog'

const LoggedIn = ({ user, setUser, setErrorMessage, blogs, newBlog, setNewBlog }) => {

  const handleNewBlog = async (e) => {
    try {
      e.preventDefault()
      await blogServices.addBlog(newBlog)
      setNewBlog({})
      setErrorMessage({ message: `${newBlog.title} by ${newBlog.author} was added to the Bloglist`, color: 'green'})
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    } catch(e) {
      console.log(e)
      setErrorMessage({ message: e.message, color: 'red' })
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }
  const handleChange = (e, prop) => {
    setNewBlog({...newBlog, [prop]: e.target.value})
  }

  const handleLogOut = async () => {
    window.localStorage.clear()
    setUser(null)
    blogServices.setToken(null)
  }
  return (
    <div>
      <h3>Hello, {user.name}</h3>
      <button onClick={handleLogOut}>Logout</button>
      <h4>Add a new Blog</h4>
      <form onSubmit={handleNewBlog}>
        <input type="text" placeholder='Title' value={newBlog.title} onChange={(e) => handleChange(e, 'title')} /><br />
        <input type="text" placeholder='Author' value={newBlog.author} onChange={(e) => handleChange(e, 'author')} /><br />
        <input type="text" placeholder='Url' value={newBlog.url} onChange={(e) => handleChange(e, 'url')} /><br />
        {/* <input type="number" placeholder='Likes' value={newBlog.likes} onChange={(e) => handleChange(e, 'likes')} /><br /> */}
        <button type="submit">Create a new blog</button>
      </form>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default LoggedIn