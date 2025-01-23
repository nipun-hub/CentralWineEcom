import { apiSlice } from './apiSlice'

export const productSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllProduct: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString()
        return {
          url: `/products?${queryString}`,
          method: 'GET',
        }
      },
      transformResponse: (response) => response.data,
    }),
    getAllAccessories: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString()
        return {
          url: `/products/getAccessories?${queryString}`,
          method: 'GET',
        }
      },
      transformResponse: (response) => response.data,
    }),
    getGreatForGift: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString()
        return {
          url: `/products/getGreatForGift?${queryString}`,
          method: 'GET',
        }
      },
      transformResponse: (response) => response.data,
    }),
    getBestSaleProduct: builder.query({
      query: (params) => {
        const queryString = new URLSearchParams(params).toString()
        return {
          url: `/products/getBestSaleProduct?${queryString}`,
          method: 'GET',
        }
      },
      transformResponse: (response) => response.data,
    }),
    getProductById: builder.query({
      query: (id) => {
        return {
          url: `/products/${id}`,
          method: 'GET',
        }
      },
    }),
    addRating: builder.mutation({
      query: (id, rating) => {
        return {
          url: `/products/rate/${id}`,
          method: 'POST',
          body: rating,
        }
      },
    }),
  }),
})

export const {
  useGetAllProductQuery,
  useGetProductByIdQuery,
  useGetAllAccessoriesQuery,
  useGetBestSaleProductQuery,
  useGetGreatForGiftQuery,
  useAddRatingMutation,
} = productSlice
