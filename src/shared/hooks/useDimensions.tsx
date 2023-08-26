import { useContext } from 'react'
import { DimensionContext } from '@shared/contexts/DimensionsContext'

export function useDimensions() {
  const context = useContext(DimensionContext)

  return context
}
