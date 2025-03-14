import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('user')?.token || ''

    if (token) {
      headers.set('Authorization', `Bearer ${token}`)
      headers.set('Content-Type', 'application/json')
    }
    return headers
  },
})

export const apiSlice = createApi({
  baseQuery,
  reducerPath: 'api',
  tagTypes: ['favorite', 'cart', 'address','payment', 'checkout'],
  endpoints: (builder) => ({}),
})

// export const { useGetPokemonByNameQuery } = pokemonApi
