import React, { useState, useRef } from 'react'
import blogServices from '../services/blogs'
import Toggleable from './Toggleable'

const BlogForm = ({ setErrorMessage, blogs, setBlogs, getBlogs }) => {
  const emptyForm = {
    title: '',
    author: '',
    url: ''
  }
  const [newBlog, setNewBlog] = useState(emptyForm)
  const toggableRef = useRef()
  const handleNewBlog = async (e) => {
    try {
      e.preventDefault()
      await blogServices.addBlog(newBlog)
      setNewBlog(emptyForm)
      toggableRef.current.toggleVisibility()
      const blogs = await blogServices.getAll()
      setBlogs(blogs)
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

  return (
    <Toggleable buttonLabel={'Fields'} ref={toggableRef}>
      <form onSubmit={handleNewBlog}>
        <input type="text" placeholder='Title' value={newBlog.title} onChange={(e) => handleChange(e, 'title')} /><br />
        <input type="text" placeholder='Author' value={newBlog.author} onChange={(e) => handleChange(e, 'author')} /><br />
        <input type="text" placeholder='Url' value={newBlog.url} onChange={(e) => handleChange(e, 'url')} /><br />
        {/* <input type="number" placeholder='Likes' value={newBlog.likes} onChange={(e) => handleChange(e, 'likes')} /><br /> */}
        <button type="submit">Create a new blog</button>
      </form>
    </Toggleable>

  )
}

export default BlogForm