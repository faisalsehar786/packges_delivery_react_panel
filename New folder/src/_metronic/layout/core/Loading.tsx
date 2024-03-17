import { createContext } from 'react'

const LoadingContext = createContext({
  loading: false,
  setLoading: (loading: boolean) => {},
})

export default LoadingContext
