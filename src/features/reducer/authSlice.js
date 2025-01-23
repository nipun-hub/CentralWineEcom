import { createSlice } from '@reduxjs/toolkit'

const userFromLocalStorage = JSON.parse(localStorage.getItem('user')) || {}

const initialState = {
  userId: userFromLocalStorage.userId || null,
  token: userFromLocalStorage.token || null,
  data: userFromLocalStorage.data || null,
  isAuthenticated:
    !!userFromLocalStorage.userId && !!userFromLocalStorage.token,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId
      state.token = action.payload.token
      state.data = action.payload.data
      state.isAuthenticated = true

      // Save the user object to localStorage
      localStorage.setItem('user', JSON.stringify(action.payload))
    },
    logout: (state) => {
      state.userId = null
      state.token = null
      state.data = null
      state.isAuthenticated = false

      // Remove user data from localStorage
      localStorage.removeItem('user')
    },
    updateName: (state, action) => {
      // Update only the user's name in the Redux state
      if (state.data) {
        state.data.firstName = action.payload.firstName
        state.data.lastName = action.payload.lastName

        // Update the user object in localStorage
        const updatedUser = {
          userId: state.userId,
          token: state.token,
          data: state.data,
          isAuthenticated: (state.isAuthenticated = true),
        }
        localStorage.setItem('user', JSON.stringify(updatedUser))
      }
    },
  },
})

export const { setUser, logout, updateName } = authSlice.actions
// export authSlice.reducer
