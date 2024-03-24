import { createContext, useEffect, useState } from 'react'
import * as Crypto from 'expo-crypto'
import { FormDataProps } from '@data/utils/FormValidator'

import { updateGrantedCourseController } from '../../../sqlite/modules/course/controller/CourseController'

export type AuthContextDataProps = {
  user: User | null
  signIn: (cpf: string, password: string) => Promise<void>
  signUp: (user: FormDataProps) => Promise<void>
  signOut: () => Promise<void>
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
  // const { course } = useStorage()

  async function login(cpf: string, isLogged: number) {
    try {
      // const res = await updateUserIsLoggedController(cpf, isLogged)
      // if (!res) {
      //   throw new Error('Erro no login')
      // }
    } finally {
      setIsLoadingUserStorage(false)
    }
  }

  async function signIn(cpf: string, password: string) {
    try {
      // setIsLoadingUserStorage(true)
      // const user = await getUserByCPFController(cpf)
      // if (!user) {
      //   throw new Error('Usuário não encontrado')
      // }
      // const passwordHash = await Crypto.digestStringAsync(
      //   Crypto.CryptoDigestAlgorithm.SHA256,
      //   password,
      // )
      // if (user?.password !== passwordHash) {
      //   throw new Error('Senha incorreta')
      // }
      // await login(cpf, 1)
      // setUser(user)
    } finally {
      setIsLoadingUserStorage(false)
    }
  }

  async function signUp({ cpf, name, password }: FormDataProps) {
    try {
      setIsLoadingUserStorage(true)

      // const user = await createUserController({ cpf, name, password })
      // console.log('user', user)

      // if (user === null) {
      //   throw new Error('O CPF informado já está cadastrado')
      // }

      // const userData = await getUserByCPFController(user.cpf)

      // if (!userData) {
      //   throw new Error('Usuário não encontrado')
      // }
      // await login(cpf, 1)
      // setUser(userData)
    } finally {
      setIsLoadingUserStorage(false)
    }
  }

  async function signOut() {
    try {
      // setIsLoadingUserStorage(true)
      // setUser(null)
      // const res = await updateUserIsLoggedController(user?.cpf || '', 0)
      // await updateGrantedCourseController(course[0].courseId, false)
      // if (!res) {
      //   throw new Error('Erro no signOut')
      // }
    } finally {
      setIsLoadingUserStorage(false)
    }
  }

  useEffect(() => {
    async function loadUserData() {
      try {
        // const userLogged = await loadUserDataController()
        // if (userLogged) {
        //   setUser(userLogged)
        // }
      } finally {
        setIsLoadingUserStorage(false)
      }
    }

    loadUserData()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signUp,
        isLoadingUserStorage,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
