import { tostAlert } from '../../utils/notification'
import { apiSlice } from './apiSlice'
import { setUser } from '../reducer/authSlice' // Import the setUser action

export const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: '/users/login',
        method: 'POST',
        body: data,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled

          const { _id: userId, ...data } = response.data.data.user
          const token = response.data.data.token
          dispatch(setUser({ userId, token, data }))
          tostAlert('success', 'Login successful!')
        } catch (error) {
          tostAlert('error', 'Login failed. Please try again.')
        }
      },
    }),
    register: builder.mutation({
      query: (data) => ({
        url: '/users/signup',
        method: 'POST',
        body: data,
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled
          tostAlert('success', 'SignUp successful! Please login now')
        } catch (error) {
          tostAlert('error', 'SignUp failed. ' + error?.error?.data?.message)
        }
      },
    }),
  }),
})

export const { useLoginMutation, useRegisterMutation } = authSlice
