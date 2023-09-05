import { FormDataProps } from '@modules/login/utils/FormValidator'
import {
  createUserController,
  getUserByCPFController,
  loadUserDataController,
  updateUserIsLoggedController,
} from 'databases/modules/users/controller/UserController'
import { User } from 'databases/modules/users/model/User'
import { createContext, useEffect, useState } from 'react'
import * as Crypto from 'expo-crypto'

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

  async function login(cpf: string, isLogged: number) {
    try {
      const res = await updateUserIsLoggedController(cpf, isLogged)
      if (!res) {
        throw new Error('Erro no login')
      }
    } finally {
      setIsLoadingUserStorage(false)
    }
  }

  async function signIn(cpf: string, password: string) {
    try {
      setIsLoadingUserStorage(true)

      const user = await getUserByCPFController(cpf)

      if (!user) {
        throw new Error('Usuário não encontrado')
      }

      const passwordHash = await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        password,
      )

      if (user?.password !== passwordHash) {
        throw new Error('Senha incorreta')
      }
      await login(cpf, 1)
      setUser(user)
      console.log(user)
    } finally {
      setIsLoadingUserStorage(false)
    }
  }

  async function signUp({ cpf, name, password }: FormDataProps) {
    try {
      setIsLoadingUserStorage(true)

      const user = await createUserController({ cpf, name, password })

      if (user === null) {
        throw new Error('O CPF informado já está cadastrado')
      }

      const userData = await getUserByCPFController(user.cpf)

      if (!userData) {
        throw new Error('Usuário não encontrado')
      }
      await login(cpf, 1)
      setUser(userData)
    } finally {
      setIsLoadingUserStorage(false)
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserStorage(true)

      const res = await updateUserIsLoggedController(user?.cpf || '', 0)

      if (!res) {
        throw new Error('Erro no signOut')
      }
      setUser(null)
    } finally {
      setIsLoadingUserStorage(false)
    }
  }

  useEffect(() => {
    async function loadUserData() {
      try {
        const userLogged = await loadUserDataController()
        if (userLogged) {
          setUser(userLogged)
        }
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
