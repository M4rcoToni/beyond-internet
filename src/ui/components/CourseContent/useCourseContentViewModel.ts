import { useCourse } from '@data/contexts/CourseContext'

export const useCourseContentViewModel = () => {
  const { handleSelectSection } = useCourse()

  return {
    handleSelectSection,
  }
}
