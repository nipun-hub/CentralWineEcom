import { tostAlert } from '../../utils/notification'
import { apiSlice } from './apiSlice'
import { updateName } from '../reducer/authSlice'

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    changeName: builder.mutation({
      query: (data) => ({
        url: '/users/updateUserName/' + data.userId,
        method: 'POST',
        body: {
          firstName: data.firstName,
          lastName: data.lastName
        }
      }),
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        try {
          const response = await queryFulfilled
          dispatch(
            updateName({
              firstName: response?.data?.data?.firstName,
              lastName: response?.data?.data?.lastName
            })
          )
          tostAlert('success', 'Name updated successfully!')
        } catch (error) {
          // More robust error handling
          const errorMessage =
            error?.error?.data?.message ||
            'An error occurred while updating the name'
          tostAlert('error', 'Update failed: ' + errorMessage)
        }
      }
    }),
    checkPasswordSame: builder.mutation({
      query: (data) => ({
        url: '/users/check-password-same/' + data.userId,
        method: 'POST',
        body: {
          password: data.password
        }
      })
    }),
    updatePassword: builder.mutation({
      query: (data) => ({
        url: `/users/${data.userId}/password`,
        method: 'PUT',
        body: {
          oldPassword: data.oldPassword,
          newPassword: data.newPassword
        }
      })
    }),
    checkEmail: builder.mutation({
      query: ({ email }) => ({
        url: '/users/check-email/',
        method: 'POST',
        body: {
          email: email
        }
      })
    })
  })
})

export const {
  useChangeNameMutation,
  useCheckPasswordSameMutation,
  useUpdatePasswordMutation,
  useCheckEmailMutation
} = userSlice
