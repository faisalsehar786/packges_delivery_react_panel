import {
  Dispatch,
  FC,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { LayoutSplashScreen } from '../../../../_metronic/layout/core'
import LoadingContext from '../../../../_metronic/layout/core/Loading'
import { handleGetRequestWithRefreshTokenHeader } from '../../../services'
import * as authHelper from './AuthHelpers'
import { getToken, setToken } from './AuthHelpers'

type AuthContextProps = {
  auth: any | undefined
  saveAuth: (auth: any | undefined) => void
  currentUser: any | undefined
  setCurrentUser: Dispatch<SetStateAction<any | undefined>>
  logout: () => void
  saveCurrentUser: (currentUser: any | undefined) => void
}

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => {},
  currentUser: localStorage.getItem('currentUser'),
  setCurrentUser: () => {},
  logout: () => {},
  saveCurrentUser: () => {},
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState)

const useAuth = () => {
  return useContext(AuthContext)
}

const AuthProvider: FC = ({ children }) => {
  const { setLoading } = useContext(LoadingContext)
  const [auth, setAuth] = useState<any | undefined>(authHelper.getAuth())
  const [currentUser, setCurrentUser] = useState<any | undefined>(authHelper.getCurrentUser())
  const saveAuth = (auth: any | undefined) => {
    setAuth(auth)
    if (auth) {
      authHelper.setAuth(auth)
    } else {
      authHelper.removeAuth()
    }
  }

  const saveCurrentUser = (currentUser: any | undefined) => {
    setCurrentUser(currentUser)
    if (currentUser) {
      authHelper.setCurrentUser(currentUser)
    } else {
      authHelper.removeCurrentUser()
    }
  }

  const logout = () => {
    if (currentUser) {
      handleGetRequestWithRefreshTokenHeader('/admin/logout')(setLoading)
    }
    saveAuth(undefined)
    setCurrentUser(undefined)
    setToken(undefined)
    localStorage.clear()
  }

  return (
    <AuthContext.Provider
      value={{ auth, saveAuth, currentUser, setCurrentUser, logout, saveCurrentUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const AuthInit: FC = ({ children }) => {
  const { auth } = useAuth()

  const didRequest = useRef(false)
  const [showSplashScreen, setShowSplashScreen] = useState(true)

  useEffect(() => {
    const token = getToken()
    if (auth && token) {
      requestUser()
    } else {
      // logout()
      setShowSplashScreen(false)
    }
    // eslint-disable-next-line
  }, [])

  const requestUser = async () => {
    try {
      if (!didRequest.current) {
        // const {data} = await getUserByToken()
        // // eslint-disable-next-line eqeqeq
        // if (data !== undefined) {
        //   console.log('data', data)
        //   setCurrentUser(data.data)
        //   setToken(`Bearer ${data.data.user.access_token}`)
        //   localStorage.setItem('currentUser', JSON.stringify(data.data))
        // }
      }
    } catch (error) {
      if (!didRequest.current) {
        // logout()
      }
    } finally {
      setShowSplashScreen(false)
    }
    return () => {
      didRequest.current = true
    }
  }

  return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
}

export { AuthInit, AuthProvider, useAuth }
