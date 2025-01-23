import { apiSlice } from './apiSlice'
import { tostAlert } from '../../utils/notification'

export const paymentSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Add Payment
    addPayment: builder.mutation({
      query: (data) => ({
        url: '/paymentMethod/add',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['payment'],
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled
          tostAlert('success', 'Payment added successfully!')
        } catch (error) {
          const errorMessage =
            error?.data?.message ||
            error?.statusText ||
            'Failed to add payment.'

          tostAlert('error', errorMessage)
        }
      },
    }),

    // Update Payment
    updatePayment: builder.mutation({
      query: ({ userId, paymentId, data }) => ({
        url: `/paymentMethod/${userId}/${paymentId}`,
        method: 'PUT', // Use PUT or PATCH based on your API
        body: data,
      }),
      invalidatesTags: ['payment'],
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          const response = await queryFulfilled
          console.log(response)
          tostAlert('success', 'Payment updated successfully!')
        } catch (error) {
          const errorMessage =
            error?.data?.message ||
            error?.statusText ||
            'Failed to update payment.'

          tostAlert('error', errorMessage)
        }
      },
    }),

    // Delete Payment
    deletePayment: builder.mutation({
      query: ({ userId, paymentId }) => ({
        url: `/paymentMethod/${userId}/${paymentId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['payment'],
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled
          tostAlert('success', 'Payment deleted successfully!')
        } catch (error) {
          const errorMessage =
            error?.data?.message ||
            error?.statusText ||
            'Failed to delete payment.'

          tostAlert('error', errorMessage)
        }
      },
    }),

    // Get Payment by ID
    getPaymentById: builder.query({
      query: (paymentId) => ({
        url: `/paymentMethod/${paymentId}`,
        method: 'GET',
      }),
      transformResponse: (response) => response.data, // Adjust this if needed
    }),

    // Get All Payments for a User
    getPayments: builder.query({
      query: (userId) => ({
        url: '/paymentMethod/' + userId,
        method: 'GET',
      }),
      providesTags: ['payment'],
      transformResponse: (response) => response.data.data, // Adjust this if needed
    }),
  }),
})

export const {
  useAddPaymentMutation,
  useUpdatePaymentMutation,
  useDeletePaymentMutation,
  useGetPaymentByIdQuery,
  useGetPaymentsQuery,
} = paymentSlice
