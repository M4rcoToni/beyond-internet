import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import { LoginFormDataProps } from '@data/utils/FormValidator'
import { Result } from '@data/result'
import { AuthRepository } from '@data/repositories/auth'
import { useState } from 'react'

export function useSignInViewModel(authRepository: AuthRepository) {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)

  async function handleSignIn({ cpf, password }: LoginFormDataProps) {
    setLoading(true)
    try {
      const user = await authRepository.login(cpf, password)
      console.log(user)
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
