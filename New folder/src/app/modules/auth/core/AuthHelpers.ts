/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import jwtDecode from 'jwt-decode'
import { handleRefreshToken } from '../../../services'

const AUTH_LOCAL_STORAGE_KEY = 'stotteapparatet-org-panel-auth-react-v'
const getAuth = (): any | undefined => {
  if (!localStorage) {
    return
  }

  const lsValue: string | null = localStorage.getItem(AUTH_LOCAL_STORAGE_KEY)
  if (!lsValue) {
    return
  }

  try {
    const auth: any = JSON.parse(lsValue) as any
    if (auth) {
      // You can easily check auth_token expiration also
      return auth
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
}

const setAuth = (auth: any) => {
  if (!localStorage) {
    return
  }

  try {
    const lsValue = JSON.stringify(auth)
    localStorage.setItem(AUTH_LOCAL_STORAGE_KEY, lsValue)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}

const getCurrentUser = (): any | undefined => {
  if (!localStorage) {
    return
  }

  const lsValue: string | null = localStorage.getItem('currentUser')
  if (!lsValue) {
    return
  }

  try {
    const user: any = JSON.parse(lsValue) as any
    if (user) {
      // You can easily check auth_token expiration also
      return user
    }
  } catch (error) {
    console.error('AUTH LOCAL STORAGE PARSE ERROR', error)
  }
}

const setCurrentUser = (user: any) => {
  if (!localStorage) {
    return
  }

  try {
    const lsValue = JSON.stringify(user)
    localStorage.setItem('currentUser', lsValue)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE SAVE ERROR', error)
  }
}

const removeCurrentUser = () => {
  if (!localStorage) {
    return
  }

  try {
    localStorage.removeItem('currentUser')
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

const removeAuth = () => {
  if (!localStorage) {
    return
  }

  try {
    localStorage.removeItem(AUTH_LOCAL_STORAGE_KEY)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

const setToken = (token: any) => {
  if (!localStorage) {
    return
  }
  try {
    localStorage.setItem('AtToken', token)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

const getToken = () => {
  if (!localStorage) {
    return
  }
  try {
    const token = localStorage.getItem('AtToken')
    return token
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

const setRefreshToken = (token: any) => {
  if (!localStorage) {
    return
  }
  try {
    localStorage.setItem('RtToken', token)
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

const getRefreshToken = () => {
  if (!localStorage) {
    return
  }
  try {
    const token = localStorage.getItem('RtToken')
    return token
  } catch (error) {
    console.error('AUTH LOCAL STORAGE REMOVE ERROR', error)
  }
}

function getTokenExpiration(token: string) {
  const { exp } = jwtDecode(token) as { exp: number }
  return new Date(exp * 1000)
}

let isRefreshing = false

export async function setupAxios(axios: any) {
  axios.defaults.headers.Accept = 'application/json'
  axios.interceptors.request.use(
    async (config: { refresh: any; headers: { Authorization: string } }) => {
      const auth = getAuth()
      let token = getToken()
      if (auth && token) {
        const expirationTime = getTokenExpiration(token)
        const currentTime = new Date()
        if (currentTime >= expirationTime) {
          console.warn('token expired', isRefreshing)
          if (!isRefreshing) {
            isRefreshing = true
            await handleRefreshToken()
            isRefreshing = false
          } else {
            // wait for token to be refreshed
            await new Promise((resolve) => {
              const interval = setInterval(() => {
                if (!isRefreshing) {
                  resolve(true)
                  clearInterval(interval)
                }
              }, 100)
            })
          }
        }
        token = getToken()
        config.headers.Authorization = `${token}`
      }
      return config
    },
    (err: any) => Promise.reject(err)
  )
}

export {
  AUTH_LOCAL_STORAGE_KEY,
  getAuth,
  getCurrentUser,
  getRefreshToken,
  getToken,
  removeAuth,
  removeCurrentUser,
  setAuth,
  setCurrentUser,
  setRefreshToken,
  setToken,
}
