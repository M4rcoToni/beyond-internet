import { DimensionContext } from '@data/contexts/DimensionsContext'
import { useContext } from 'react'

export function useDimensions() {
  const context = useContext(DimensionContext)

  return context
}
