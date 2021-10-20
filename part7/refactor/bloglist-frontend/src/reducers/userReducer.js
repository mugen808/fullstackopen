import blogServices from '../services/blogs'
import loginServices from '../services/login'

const initialState = {
  loggedIn: false
}
const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case ('@user/login'):
    return action.payload
  case ('@user/logout'):
    return { loggedIn: false }
  default:
    return state
  }
}

export const userLogIn = ({ username, password }) => {
  return async dispatch => {
    const user = await loginServices({ username, password })
    blogServices.setToken(user.token)
    window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
    dispatch({
      type: '@user/login',
      payload: {
        loggedIn: true,
        user
      }
    })
  }
}

export const userLogged = (loggedUser) => {
  const user = JSON.parse(loggedUser)
  blogServices.setToken(user.token)
  return {
    type: '@user/login',
    payload: {
      loggedIn: true,
      user
    }
  }
}

export const userLogout = () => {
  window.localStorage.clear()
  blogServices.setToken(null)
  return {
    type: '@user/logout'
  }
}

export default userReducer