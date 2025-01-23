import { apiSlice } from './apiSlice'

export const imageSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getImage: builder.query({
      query: () => ({
        url: '/images/get-images',
        method: 'GET',
      }),
      transformResponse: (response) => response.data,
    }),
  }),
})

export const { useGetImageQuery } = imageSlice
