import { useEffect } from 'react'
import Toast from 'react-native-toast-message'

import { useCourse } from '@data/contexts/CourseContext'
import { CoursesRepository } from '@data/repositories/course'
import { Result } from '@data/result'

export function useDrawerViewModel(courseRepository: CoursesRepository) {
  const { index, section, handleSetCourses } = useCourse()
  const handleOnListCourses = async () => {
    try {
      const response = await courseRepository.listCourses()

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

  useEffect(() => {
    handleOnListCourses()
  }, [index])

  return {
    index,
    section,
  }
}
