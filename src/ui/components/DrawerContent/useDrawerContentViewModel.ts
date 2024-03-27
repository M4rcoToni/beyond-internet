import { Result } from '@data/result'
import { AuthRepository } from '@data/repositories/auth'
import Toast from 'react-native-toast-message'
import { useAuth } from '@data/contexts/AuthContext'
import { CoursesRepository } from '@data/repositories/course'

export function useDrawerContentViewModel(
  authRepository?: AuthRepository,
  courseRepository?: CoursesRepository,
) {
  const { user, setUserData } = useAuth()

  async function handleLogout() {
    try {
      await authRepository?.update(user?.id || 0, { isLogged: 0 })
      setUserData(null)
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error instanceof Result ? error.getError()?.message : 'Erro',
      })
    }
  }

  const handleOnGetCourse = async () => {
    try {
      const response = await courseRepository?.createCourse()
      return response
    } catch (error) {
      console.log('error', error)

      Toast.show({
        type: 'error',
        text1: error instanceof Result ? error.getError()?.message : 'Erro',
      })
    }
  }

  return {
    handleLogout,
    handleOnGetCourse,
    user,
  }
}
