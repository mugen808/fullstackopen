import blogServices from '../services/blogs'

export const initBlogs = () => {
  return async dispatch => {
    const bloglist = await blogServices.getAll()
    dispatch({
      type: '@bloglist/init',
      payload: bloglist
    })
  }
}

export const addBlog = (blog) => {
  return async dispatch => {
    await blogServices.addBlog(blog)
    dispatch(initBlogs())
  }
}

export const likeBlog = (blog, id) => {
  return async dispatch => {
    await blogServices.updateBlog(blog, id)
    dispatch(initBlogs())
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogServices.deleteBlog(id)
    dispatch(initBlogs())
  }
}

const blogsReducer = (state = [], action) => {
  switch (action.type) {
  case '@bloglist/init':
    return [...action.payload]
  default:
    return state
  }
}

export default blogsReducer