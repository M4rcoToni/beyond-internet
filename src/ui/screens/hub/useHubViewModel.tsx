import { Alert } from 'react-native'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'

import { useCourse } from '@data/contexts/CourseContext'
import { CoursesRepository } from '@data/repositories/course'
import { Result } from '@data/result'
import { SectionDTO } from '@sqlite/modules/sections/interfaces/ISectionInterface'

export function useHubViewModel(courseRepository: CoursesRepository) {
  const { navigate } = useNavigation()
  const { handleSelectSection, handleSetIndex, handleSetCourses, courses } =
    useCourse()

  const handleOnListCourses = async () => {
    try {
      const response = await courseRepository.listCourses()
      console.log('response', response)

      if (response) {
        handleSetCourses(response)
      }
    } catch (error) {
      console.log('error', error)

      Toast.show({
        type: 'error',
        text1:
          error instanceof Result
            ? error.getError()?.message
            : 'handleOnListCourses',
      })
    }
  }
  const handleOnGetCourse = async () => {
    try {
      await courseRepository.createCourse()
      handleOnListCourses()
    } catch (error) {
      console.error('error', error)
      Toast.show({
        type: 'error',
        text1: error instanceof Result ? error.getError()?.message : 'Erro',
      })
    }
  }

  const handleOnDeleteCourse = async (id: string) => {
    try {
      Alert.alert('Deletar curso', 'Deseja realmente deletar o curso?', [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Deletar',
          onPress: async () => {
            const res = await courseRepository.deleteCourse(id)
            if (res)
              Toast.show({
                type: 'success',
                text1: 'Curso deletado com sucesso',
              })
            handleOnListCourses()
          },
        },
      ])

      handleOnListCourses()
    } catch (error) {
      console.error('error', error)
      Toast.show({
        type: 'error',
        text1: error instanceof Result ? error.getError()?.message : 'Erro',
      })
    }
  }

  const handleOnCoursePress = (section: SectionDTO, index: number) => {
    handleSelectSection(section)
    handleSetIndex(index)
    navigate('Course', { index, courses })
  }

  return {
    courses,
    handleOnGetCourse,
    handleOnListCourses,
    handleOnDeleteCourse,
    handleOnCoursePress,
  }
}
