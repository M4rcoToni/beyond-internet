import { useCourse } from '@data/contexts/CourseContext'

export const useCourseContentViewModel = () => {
  const { handleSetIndex, index } = useCourse()

  return {
    handleSetIndex,
    sectionIndex: index,
  }
}
