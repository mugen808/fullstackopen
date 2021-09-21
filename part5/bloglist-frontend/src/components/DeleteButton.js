import React from 'react'
import blogServices from '../services/blogs'

const DeleteButton = ({ blog, setBlogs }) => {
  const handleDelete = async () => {
    const confirm = window.confirm(`Remove ${blog.title} by ${blog.author}?`)
    if (confirm) {
      try {
        await blogServices.deleteBlog(blog.id)
        const blogs = await blogServices.getAll()
        setBlogs(blogs)
      } catch(e) {
        console.log('error deleting: ', e)
      }
    }
  }
  return (
    <button onClick={handleDelete}>Delete</button>
  )
}

export default DeleteButton