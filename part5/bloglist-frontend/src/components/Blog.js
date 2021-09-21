import React from 'react'
import Toggleable from './Toggleable'
import LikeButton from './LikeButton'
import DeleteButton from './DeleteButton'


const Blog = ({ blog, setBlogs, user }) => {
  const blogStyle = {
    border: '2px solid black',
    margin: 1,
    padding: 1,
    paddingLeft: 10,
    paddingBottom: 5
  }
  return (
    <div style={blogStyle}>
      <p><strong>{blog.title}</strong></p>
      <Toggleable buttonLabel='Details'>
        <p><strong>Author:</strong>  {blog.author}</p>
        <p><strong>Url: </strong> {blog.url}</p>
        <p><strong>Likes:</strong> {blog.likes} <LikeButton blog={blog} setBlogs={setBlogs}/></p>
        <p>{blog.user.name}</p>
        {user.username === blog.user.username && <DeleteButton blog={blog} setBlogs={setBlogs}/>}
      </Toggleable>
    </div>
  )
}

export default Blog