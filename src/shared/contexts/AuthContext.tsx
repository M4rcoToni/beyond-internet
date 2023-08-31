import { FormDataProps } from '@modules/login/utils/FormValidator'
import { createUserController } from 'databases/modules/users/controller/UserController'
import { User } from 'databases/modules/users/model/User'
import { createContext, useEffect, useState } from 'react'

export type AuthContextDataProps = {
  user: User
  signIn: (email: string, password: string) => Promise<void>
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

  async function signIn(email: string, password: string) {
    //   try {
    //     // const { data } = await api.post('/sessions', { email, password });
    //     // if (data.user) {
    //     //   setUser(data.user);
    //     //   storageUserSave(data.user)
    //     // }
    //   } catch (error) {
    //     throw error
    //   }
  }

  async function signUp({
    cpf,
    name,
    password,
    passwordConfirm,
  }: FormDataProps) {
    try {
      setIsLoadingUserStorage(true)
      if (password === passwordConfirm) {
        const callback = (userId: number | null) => {
          if (userId !== null) return true
          else return false
        }

        createUserController(name, cpf, password, callback)
      }
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
