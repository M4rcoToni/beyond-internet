/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'
import { UserDTO } from '@sqlite/modules/users/interfaces/IUserInterface'
import { AuthRepository } from '@data/repositories/auth'
import { AuthService } from '@data/services/auth'

export type AuthContextDataProps = {
  user: UserDTO | null
  loadingUser: boolean
  setUserData: (user: UserDTO | null) => void
  studyStartTime: React.MutableRefObject<number>
  setStudyTime: (time: number) => void
}

type AuthContextProviderProps = {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO | null>(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const studyStartTime = useRef(0)
  const userRepository = new AuthRepository(new AuthService())

  const setUserData = useCallback((user: UserDTO | null) => {
    setUser(user)
  }, [])

  const setStudyTime = useCallback((time: number) => {
    console.log('time', time)
    studyStartTime.current = time
  }, [])

  const loadUser = useCallback(async () => {
    try {
      const user = await userRepository.first()

      if (user?.id) {
        setUser(user)
      }
    } catch (error) {
      console.error('Error loading user: ', error)
    } finally {
      setLoadingUser(false)
    }
  }, [])

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        loadingUser,
        setUserData,
        studyStartTime,
        setStudyTime,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
export function useAuth() {
  const context = useContext(AuthContext)

  return context
}
