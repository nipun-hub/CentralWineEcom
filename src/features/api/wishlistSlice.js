import { apiSlice } from './apiSlice'
import { tostAlert } from '../../utils/notification'

export const wishListSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToWishList: builder.mutation({
      query: (data) => ({
        url: '/fav/add-favorite',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['favorite'],
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled
          tostAlert('success', 'Item added to Favorite!')
        } catch (error) {
          const errorMessage =
            error?.error?.data?.message ||
            error?.error?.statusText ||
            'Failed to add item to Favorite.'

          tostAlert('error', errorMessage)
        }
      },
    }),
    removeFromWishList: builder.mutation({
      query: (data) => ({
        url: '/fav/remove-favorite',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['favorite'],
      // onQueryStarted: async (arg, { queryFulfilled }) => {
      //   try {
      //     await queryFulfilled
      //     tostAlert('success', 'Item removed from favorite!')
      //   } catch (error) {
      //     tostAlert('error', 'Failed to remove item from favorite.')
      //   }
      // },
    }),
    getWishListItems: builder.query({
      query: (userId) => ({
        url: '/fav/all-favorites',
        method: 'GET',
        params: { userId },
      }),
      providesTags: ['favorite'],
      transformResponse: (response) => response.data.favorites,
    }),
  }),
})

export const {
  useAddToWishListMutation,
  useRemoveFromWishListMutation,
  useGetWishListItemsQuery,
} = wishListSlice
