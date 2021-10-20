import notificationsReducer from './notificationsReducer'
import blogsReducer from './blogsReducer'
import userReducer from './userReducer'
import { combineReducers } from 'redux'

const reducers = combineReducers({
  notifications: notificationsReducer,
  blogs: blogsReducer,
  user: userReducer
})

export default reducers