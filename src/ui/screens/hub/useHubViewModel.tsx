import { Alert } from 'react-native'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'
import { useState } from 'react'

import { useCourse } from '@data/contexts/CourseContext'
import { CoursesRepository } from '@data/repositories/course'
import { SectionsRepository } from '@data/repositories/sections'
import { Result } from '@data/result'

export function useHubViewModel(
  courseRepository: CoursesRepository,
  sectionRepository: SectionsRepository,
) {
  const { navigate } = useNavigation()
  const [isOpeningCourse, setIsOpeningCourse] = useState(false)
  const [isListingCourses, setIsListingCourses] = useState(false)
  const {
    handleSetSection,
    handleSetCourseId,
    handleSetIndex,
    handleSetCourses,
    courses,
  } = useCourse()

  const handleOnListCourses = async () => {
    try {
      setIsListingCourses(true)
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
    } finally {
      setIsListingCourses(false)
    }
  }
  const handleOnGetCourse = async () => {
    try {
      console.log('handleOnGetCourse')
      await courseRepository.createCourse()
      await handleOnListCourses()
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
      setIsOpeningCourse(true)
      const course = await sectionRepository.listSections(courseId)
      if (course) {
        handleSetIndex(0)
        handleSetSection(course)
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
      setIsOpeningCourse(false)
    }
  }

  return {
    courses,
    handleOnGetCourse,
    handleOnListCourses,
    handleOnDeleteCourse,
    handleOnCoursePress,
    isOpeningCourse,
    isListingCourses,
  }
}
