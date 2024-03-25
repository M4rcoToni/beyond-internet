/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { UserDTO } from '@sqlite/modules/users/interfaces/IUserInterface'
import { AuthRepository } from '@data/repositories/auth'
import { AuthService } from '@data/services/auth'

export type AuthContextDataProps = {
  user: UserDTO | null
  loadingUser: boolean
  setUserData: (user: UserDTO | null) => void
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
  const userRepository = new AuthRepository(new AuthService())

  const setUserData = useCallback((user: UserDTO | null) => {
    setUser(user)
  }, [])

  const loadUser = useCallback(async () => {
    const user = await userRepository.first()

    setUser(user)
    if (!user?.id || user) {
      setTimeout(() => {
        setLoadingUser(false)
      }, 600)
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
