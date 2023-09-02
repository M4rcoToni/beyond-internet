import { FormDataProps } from '@modules/login/utils/FormValidator'
import {
  createUserController,
  getUserByCPFController,
} from 'databases/modules/users/controller/UserController'
import { User } from 'databases/modules/users/model/User'
import { createContext, useEffect, useState } from 'react'

export type AuthContextDataProps = {
  user: User
  signIn: ({ cpf, password }: User) => Promise<void>
  signOut: () => Promise<void>
  signUp: (user: FormDataProps) => Promise<boolean | undefined>
  isLoadingUserStorage: boolean
}

type AuthContextProviderProps = {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps,
)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<User>({} as User)
  const [isLoadingUserStorage, setIsLoadingUserStorage] = useState(true)

  async function signIn({ cpf, password }: User) {
    try {
      setIsLoadingUserStorage(true)

      const user = await getUserByCPFController(cpf)

      if (user?.password === password) {
        setUser(user)
      }
    } catch (error) {
      throw new Error(`Erro ao fazer login ${error}`)
    } finally {
      setIsLoadingUserStorage(false)
    }
  }

  async function signUp({ cpf, name, password }: FormDataProps) {
    try {
      setIsLoadingUserStorage(true)

      const user: User = {
        cpf,
        name,
        password,
      }

      await createUserController(user)
    } catch (error) {
      console.log(error)
      return false
    } finally {
      setIsLoadingUserStorage(false)
    }
  }

  // async function loadUserData() {
  //   try {
  //     // const userLogged = await storageUserGet();
  //     // if (userLogged) {
  //     //   setUser(user);
  //     // }
  //   } catch (error) {
  //     throw error
  //   } finally {
  //     setIsLoadingUserStorage(false)
  //   }
  // }

  // useEffect(() => {
  //   loadUserData()
  // }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        isLoadingUserStorage,
        // signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
