import { configureStore, combineReducers } from '@reduxjs/toolkit'
import userReducer from './userSlice'
import { logout } from './userSlice'  // import your logout action

// Combine all reducers
const appReducer = combineReducers({
  user: userReducer,
})

// Custom root reducer to reset all slices on logout
const rootReducer = (state, action) => {
  if (action.type === logout.type) {
    return {
      user: userReducer(undefined, { type: '' }),
    }
  }

  return appReducer(state, action)
}

export const store = configureStore({
  reducer: rootReducer,
})
