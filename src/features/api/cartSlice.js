import { apiSlice } from './apiSlice'
import { tostAlert } from '../../utils/notification'

export const cartSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation({
      query: (data) => ({
        url: '/cart/add-cart',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['cart'],
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled
          tostAlert('success', 'Item added to cart!')
        } catch (error) {
          tostAlert('error', 'Failed to add item to cart.')
        }
      },
    }),
    removeFromCart: builder.mutation({
      query: (data) => ({
        url: '/cart/remove-cart',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['cart'],
      // onQueryStarted: async (arg, { queryFulfilled }) => {
      //   try {
      //     await queryFulfilled
      //     tostAlert('success', 'Item removed from cart!')
      //   } catch (error) {
      //     tostAlert('error', 'Failed to remove item from cart.')
      //   }
      // },
    }),
    getCartItems: builder.query({
      query: (userId) => ({
        url: '/cart/all-carts',
        method: 'GET',
        params: { userId },
      }),
      providesTags: ['cart'],
      transformResponse: (response) => response.data.cartItems,
    }),
    updateCart: builder.mutation({
      query: (data) => ({
        url: '/cart/update-qty',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['cart'],
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled
          tostAlert('success', 'Updated to cart!')
        } catch (error) {
          tostAlert('error', 'Failed to Updated to cart.')
        }
      },
    }),
    clearCart: builder.mutation({
      query: (id) => ({
        url: `/cart/clear/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['cart'],
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled
          console.log('Clear cart')
          // tostAlert('success', 'Clear to cart!')
        } catch (error) {
          console.log(error)
          // tostAlert('error', 'Failed to Updated to cart.')
        }
      },
    }),
  }),
})

export const {
  useAddToCartMutation,
  useRemoveFromCartMutation,
  useGetCartItemsQuery,
  useUpdateCartMutation,
  useClearCartMutation,
} = cartSlice
