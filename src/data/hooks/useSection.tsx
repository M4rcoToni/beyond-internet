import { useContext } from 'react'
import { SectionContext } from '../contexts/SectionContext'

export function useSection() {
  const context = useContext(SectionContext)

  return context
}
