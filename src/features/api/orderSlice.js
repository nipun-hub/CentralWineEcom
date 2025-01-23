import { apiSlice } from './apiSlice'
import { tostAlert } from '../../utils/notification'

export const ordersSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    checkout: builder.mutation({
      query: (data) => ({
        url: '/orders/orders',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['checkout'],
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled
          tostAlert('success', 'checkout successful!')
        } catch (error) {
          tostAlert(
            'error',
            `${error?.error?.data?.error ? error.error.data.error : 'Failed checkout try again'}`,
          )
        }
      },
    }),
    getOrderByUser: builder.query({
      query: (id) => ({
        url: '/orders/orders/userOrderHistory/' + id,
        method: 'GET',
      }),
      providesTags: ['checkout'],
    }),
  }),
})

export const { useCheckoutMutation, useGetOrderByUserQuery } = ordersSlice
