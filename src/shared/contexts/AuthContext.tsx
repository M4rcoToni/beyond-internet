import { FormDataProps } from '@modules/login/utils/FormValidator'
import {
  createUserController,
  getUserByCPFController,
} from 'databases/modules/users/controller/UserController'
import { User } from 'databases/modules/users/model/User'
import { createContext, useEffect, useState } from 'react'

export type AuthContextDataProps = {
  user: User
  signIn: (cpf: string, password: string) => Promise<void>
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
  const [user, setUser] = useState<User | null>(null)
  const [isLoadingUserStorage, setIsLoadingUserStorage] = useState(true)

  async function signIn(cpf: string, password: string) {
    try {
      setIsLoadingUserStorage(true)

      const user = await getUserByCPFController(cpf)

      if (!user) {
        throw new Error('Usuário não encontrado')
      }

      if (user?.password !== password) {
        throw new Error('Senha incorreta')
      }

      setUser(user)
      console.log(user)
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
