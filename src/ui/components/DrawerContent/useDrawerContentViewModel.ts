import { Result } from '@data/result'
import { AuthRepository } from '@data/repositories/auth'
import Toast from 'react-native-toast-message'
import { useAuth } from '@data/contexts/AuthContext'

export function useDrawerContentViewModel(authRepository: AuthRepository) {
  const { user, setUserData } = useAuth()

  async function handleLogout() {
    try {
      await authRepository.update(user?.id || 0, { isLogged: 0 })
      setUserData(null)
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error instanceof Result ? error.getError()?.message : 'Erro',
      })
    }
  }

  return {
    handleLogout,
    user,
  }
}
