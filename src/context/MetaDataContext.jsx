import React, { createContext, useState, useEffect } from 'react'
import axiosInstance from '../utils/axiosInstance'

export const MetaDataContext = createContext()

export function MetaDataContextProvider ({ children }) {
  const [metaData, setMetaData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchMetaData = async () => {
    try {
      const response = await axiosInstance.get('/meta-data/all')
      setMetaData(response.data.data)
      setLoading(false)
    } catch (error) {
      setError('Failed to fetch metadata')
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMetaData()
  }, [])

  return (
    <MetaDataContext.Provider value={{ metaData, loading, error }}>
      {children}
    </MetaDataContext.Provider>
  )
}
