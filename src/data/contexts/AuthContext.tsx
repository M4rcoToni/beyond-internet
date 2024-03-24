import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { UserDTO } from '@sqlite/modules/users/interfaces/IUserInterface'

export type AuthContextDataProps = {
  user: UserDTO | null
  setUserData: (user: UserDTO) => void
}

type AuthContextProviderProps = {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO | null>(null)

  const setUserData = useCallback((user: UserDTO) => {
    setUser(user)
  }, [])

  useEffect(() => {
    async function loadUserData() {
      // const userLogged = await loadUserDataController()
      // if (userLogged) {
      //   setUser(userLogged)
      // }
    }

    loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
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
