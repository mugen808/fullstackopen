import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from '../reducers/blogsReducer'
import Blog from './Blog'
import BlogForm from './BlogForm'
import { userLogout } from '../reducers/userReducer'


const LoggedIn = () => {
  const dispatch = useDispatch()
  const bloglist = useSelector(store => store.blogs.sort((a, b) => b.likes - a.likes))
  const user = useSelector(store => store.user)

  useEffect(() => {
    async function getBlogs() {
      dispatch(initBlogs())
    }
    getBlogs()
  }, [])

  const handleLogOut = () => {
    dispatch(userLogout())
  }

  return (
    <div>
      <h3>Hello, {user.name}</h3>
      <button onClick={handleLogOut}>Logout</button>
      <h4>Create a new Blog</h4>
      <BlogForm />
      <h2>blogs</h2>
      {bloglist.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
        />
      )}
    </div>
  )
}

export default LoggedIn