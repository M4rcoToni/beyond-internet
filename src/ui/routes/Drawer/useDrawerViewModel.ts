import { useSection } from '@data/contexts/SectionContext'
import { CoursesRepository } from '@data/repositories/course'
import { Result } from '@data/result'
import { CourseDTO } from '@sqlite/modules/course/interfaces/ICourseInterfaces'
import { useEffect, useState } from 'react'
import Toast from 'react-native-toast-message'

export function useDrawerViewModel(courseRepository: CoursesRepository) {
  const { index, section } = useSection()
  const [courses, setCourses] = useState<CourseDTO[]>([])
  const handleOnListCourses = async () => {
    try {
      const response = await courseRepository.listCourses()

      if (response) {
        setCourses(response)
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
    courses,
  }
}
