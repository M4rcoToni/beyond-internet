import { CourseRepository } from '@data/repositories/course'
import { Result } from '@data/result'
import Toast from 'react-native-toast-message'

export function useSignInViewModel(courseRepository: CourseRepository) {
  const openCourse = async () => {
    try {
      const response = await courseRepository.openCourse()
      return response
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: error instanceof Result ? error.getError()?.message : 'Erro',
      })
    }
  }

  return {
    openCourse,
  }
}
