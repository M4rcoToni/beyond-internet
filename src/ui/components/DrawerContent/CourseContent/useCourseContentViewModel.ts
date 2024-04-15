import { useCourse } from '@data/contexts/CourseContext'

export const useCourseContentViewModel = () => {
  const { handleSetIndex } = useCourse()

  return {
    handleSetIndex,
  }
}
