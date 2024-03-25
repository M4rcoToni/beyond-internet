import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import { LoginFormDataProps } from '@data/utils/FormValidator'
import { Result } from '@data/result'
import { AuthRepository } from '@data/repositories/auth'
import { useState } from 'react'
import { useAuth } from '@data/contexts/AuthContext'

export function useSignInViewModel(authRepository: AuthRepository) {
  const { setUserData } = useAuth()
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)

  async function handleSignIn({ cpf, password }: LoginFormDataProps) {
    setLoading(true)
    try {
      const res = await authRepository.login(cpf, password)
      const user = res?.getValue()
      Toast.show({
        type: 'success',
        text1: 'Login efetuado com sucesso',
      })
      if (user) {
        setTimeout(() => {
          setUserData(user)
        }, 1300)
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error instanceof Result ? error.getError()?.message : 'Erro',
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    navigation,
    handleSignIn,
    loading,
  }
}
