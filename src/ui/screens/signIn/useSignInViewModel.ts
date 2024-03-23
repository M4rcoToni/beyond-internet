import { LoginFormDataProps } from '@data/utils/FormValidator'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-toast-message'
import { AuthRepository } from '../../../data/repositories/auth/index'

export function useSignInViewModel(authRepository: AuthRepository) {
  const navigation = useNavigation()

  async function handleSignIn({ cpf, password }: LoginFormDataProps) {
    try {
      const user = await authRepository.login(cpf, password)
      console.log(user)
    } catch (error) {
      Toast.show({
        type: 'error',
        text1:
          error instanceof Error ? error.message : 'Erro ao realizar login',
      })
    }
  }

  return {
    navigation,
    handleSignIn,
  }
}
