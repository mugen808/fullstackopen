import React, { useState, useRef } from 'react'
import Toggleable from './Toggleable'
import { useDispatch } from 'react-redux'
import { newNotification } from '../reducers/notificationsReducer'
import { addBlog } from '../reducers/blogsReducer'

const BlogForm = () => {
  const dispatch = useDispatch()
  const toggableRef = useRef()

  const emptyFormFields = {
    title: '',
    author: '',
    url: ''
  }
  const [newBlog, setNewBlog] = useState(emptyFormFields)

  const handleNewBlog = async (e) => {
    try {
      e.preventDefault()
      dispatch(addBlog(newBlog))
      setNewBlog(emptyFormFields)
      toggableRef.current.toggleVisibility()

      dispatch(newNotification(`${newBlog.title} by ${newBlog.author} was added to the Bloglist`))
    } catch(e) {
      console.log(e)
      dispatch(newNotification(e.message))
    }
  }

  const handleChange = (e, prop) => {
    setNewBlog({ ...newBlog, [prop]: e.target.value })
  }

  return (
    <Toggleable buttonLabel={'Fields'} ref={toggableRef}>
      <form onSubmit={handleNewBlog} id='blogForm'>
        <input id='title' type="text" placeholder='Title' value={newBlog.title} onChange={(e) => handleChange(e, 'title')} /><br />
        <input id='author' type="text" placeholder='Author' value={newBlog.author} onChange={(e) => handleChange(e, 'author')} /><br />
        <input id='url' type="text" placeholder='Url' value={newBlog.url} onChange={(e) => handleChange(e, 'url')} /><br />
        {/* <input type="number" placeholder='Likes' value={newBlog.likes} onChange={(e) => handleChange(e, 'likes')} /><br /> */}
        <button type="submit">Create a new blog</button>
      </form>
    </Toggleable>

  )
}

export default BlogForm