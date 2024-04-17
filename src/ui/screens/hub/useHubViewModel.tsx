import { Alert } from 'react-native'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'

import { useCourse } from '@data/contexts/CourseContext'
import { CoursesRepository } from '@data/repositories/course'
import { Result } from '@data/result'
import { useState } from 'react'

export function useHubViewModel(courseRepository: CoursesRepository) {
  const { navigate } = useNavigation()
  const [isLoading, setIsLoading] = useState(false)
  const {
    handleSetSection,
    handleSetCourseId,
    handleSetIndex,
    handleSetCourses,
    courses,
  } = useCourse()

  const handleOnListCourses = async () => {
    try {
      const response = await courseRepository.listCourses()

      if (response) {
        handleSetCourses(response)
      }
    } catch (error) {
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
            if (res) {
              Toast.show({
                type: 'success',
                text1: 'Curso deletado com sucesso',
              })
              handleSetCourses(
                courses.filter((course) => course.courseId !== id),
              )
            }
          },
        },
      ])
    } catch (error) {
      console.error('error', error)
      Toast.show({
        type: 'error',
        text1: error instanceof Result ? error.getError()?.message : 'Erro',
      })
    }
  }

  const handleOnCoursePress = async (courseId: number) => {
    try {
      setIsLoading(true)
      const courses = await courseRepository.listSections(courseId)
      if (courses) {
        handleSetIndex(0)
        handleSetSection(courses)
        handleSetCourseId(String(courseId))
        navigate('Course')
      }
    } catch (error) {
      console.error('error', error)
      Toast.show({
        type: 'error',
        text1: error instanceof Result ? error.getError()?.message : 'Erro',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return {
    courses,
    handleOnGetCourse,
    handleOnListCourses,
    handleOnDeleteCourse,
    handleOnCoursePress,
    isLoading,
  }
}
