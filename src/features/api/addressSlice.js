import { apiSlice } from './apiSlice'
import { tostAlert } from '../../utils/notification'

export const addressSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addAddress: builder.mutation({
      query: (data) => {
        return {
          url: '/address/add',
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: ['address'],
      onQueryStarted: async (arg, { queryFulfilled }) => {
        // console.log(data)
        try {
          const response = await queryFulfilled
          console.log(response)
          tostAlert('success', 'Address added successfully!')
        } catch (error) {
          console.log(error)
          const errorMessage =
            error?.data?.message || // Adjusted to common RTK Query error shape
            error?.statusText ||
            'Failed to add address.'

          tostAlert('error', errorMessage)
        }
      },
    }),
    updateAddress: builder.mutation({
      query: ({ userId, addressId, data }) => {
        return {
          url: `/address/${userId}/${addressId}`,
          method: 'PUT',
          body: data,
        }
      },
      invalidatesTags: ['address'],
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled
          tostAlert('success', 'Address updated successfully!')
        } catch (error) {
          const errorMessage =
            error?.data?.message ||
            error?.statusText ||
            'Failed to update address.'

          tostAlert('error', errorMessage)
        }
      },
    }),
    deleteAddress: builder.mutation({
      query: ({ userId, addressId }) => ({
        url: `/address/${userId}/${addressId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['address'],
      onQueryStarted: async (arg, { queryFulfilled }) => {
        try {
          await queryFulfilled
          tostAlert('success', 'Address deleted successfully!')
        } catch (error) {
          const errorMessage =
            error?.data?.message ||
            error?.statusText ||
            'Failed to delete address.'

          tostAlert('error', errorMessage)
        }
      },
    }),
    getAddress: builder.query({
      query: (userId) => ({
        url: '/address/' + userId,
        method: 'GET',
      }),
      providesTags: ['address'],
      transformResponse: (response) => response.data.data,
    }),
  }),
})

export const {
  useAddAddressMutation,
  useGetAddressQuery,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = addressSlice
