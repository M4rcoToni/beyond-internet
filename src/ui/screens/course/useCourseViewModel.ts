import { Dimensions } from 'react-native'
import { useMemo } from 'react'
import { useCourse } from '@data/contexts/CourseContext'
import { CourseDTO } from '@sqlite/modules/course/interfaces/ICourseInterfaces'

export const useCourseViewModel = () => {
  const { sections, index, courses, courseId } = useCourse()

  const course = useMemo(() => {
    return courses.find(
      (course: CourseDTO) => Number(course.courseId) === Number(courseId),
    )
  }, [courses, courseId])
  console.log('course', courses)
  const width = useMemo(() => {
    return Dimensions.get('window').width
  }, [])

  // if (!course) {
  //   return null
  // }

  return {
    course,
    width,
    sections,
    index,
  }
}
