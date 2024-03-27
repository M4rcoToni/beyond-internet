import { CoursesRepository } from '@data/repositories/course'
import { Result } from '@data/result'
import Toast from 'react-native-toast-message'

export function useHubViewModel(courseRepository: CoursesRepository) {
  const handleOnGetCourse = async () => {
    try {
      const response = await courseRepository.createCourse()
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
    handleOnGetCourse,
  }
}
