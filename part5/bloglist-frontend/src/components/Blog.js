import React from 'react'
import Toggleable from './Toggleable'
import blogServices from '../services/blogs'


const Blog = ({ blog, user, setBlogs }) => {
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
  const handleLike = async () => {
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id }
    await blogServices.updateBlog(updatedBlog, blog.id)
    const blogs = await blogServices.getAll()
    setBlogs(blogs)
  }
  const blogStyle = {
    border: '2px solid black',
    margin: 1,
    padding: 1,
    paddingLeft: 10,
    paddingBottom: 5
  }
  return (
    <div style={blogStyle} className='blog'>
      <p><strong>Title: </strong>{blog.title}</p>
      <p><strong>by: </strong>  {blog.author}</p>
      <Toggleable buttonLabel='Details'>
        <p>
          <strong>Url: </strong> {blog.url}
        </p>
        <p>
          <strong>Likes:</strong> {blog.likes}
          <button onClick={handleLike} id="blog-like-button">Like</button>
        </p>
        <p>{blog.user.name}</p>
        {user.username === blog.user.username && (<button onClick={handleDelete}>Delete</button>)}
      </Toggleable>
    </div>
  )
}

export default Blog