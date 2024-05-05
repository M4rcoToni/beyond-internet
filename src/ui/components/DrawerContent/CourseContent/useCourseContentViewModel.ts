import { useCourse } from '@data/contexts/CourseContext'

export const useCourseContentViewModel = () => {
  const { handleSetIndex, index, courseScrollViewRef } = useCourse()

  return {
    handleSetIndex,
    sectionIndex: index,
    courseScrollViewRef,
  }
}
