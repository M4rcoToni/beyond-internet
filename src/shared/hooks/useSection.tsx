import { useContext } from 'react'
import { SectionContext } from '@shared/contexts/CourseContext'

export function useSection() {
  const context = useContext(SectionContext)

  return context
}
