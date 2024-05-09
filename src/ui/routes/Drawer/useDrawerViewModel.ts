import { useCourse } from '@data/contexts/CourseContext'
import { useAuth } from '@data/contexts/AuthContext'

export function useDrawerViewModel() {
  const { index, sections } = useCourse()
  const { user } = useAuth()

  return {
    index,
    sections,
    user,
  }
}
