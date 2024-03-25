import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import { FormDataProps, LoginFormDataProps } from '@data/utils/FormValidator'
import { Result } from '@data/result'
import { AuthRepository } from '@data/repositories/auth'
import { useState } from 'react'
import { useAuth } from '@data/contexts/AuthContext'

export function useSignUpViewModel(authRepository: AuthRepository) {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const { setUserData } = useAuth()

  async function handleSignUp({
    cpf,
    name,
    password,
    passwordConfirm,
  }: FormDataProps) {
    setLoading(true)
    try {
      if (password !== passwordConfirm) {
        throw new Result(false, undefined, new Error('Senhas não conferem'))
      }

      const user = await authRepository.createUser({
        cpf,
        name,
        password,
      })

      Toast.show({
        type: 'success',
        text1: 'Usuário criado com sucesso',
      })

      if (user) {
        setTimeout(() => {
          setUserData(user)
        }, 600)
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
    handleSignUp,
    loading,
  }
}
