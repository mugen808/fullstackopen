import React from 'react'
import blogServices from '../services/blogs'

const LikeButton = ({blog, setBlogs}) => {
  const updatedBlog = {...blog, likes: blog.likes + 1, user: blog.user.id }
  const handleClick = async () => {
    await blogServices.updateBlog(updatedBlog, blog.id)
    const blogs = await blogServices.getAll()
    setBlogs(blogs)
  }
  return (
    <button onClick={handleClick}>Like</button>
  )
}

export default LikeButton