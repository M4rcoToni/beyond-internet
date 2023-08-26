import React, { createContext, useEffect, useState, useCallback } from 'react'
import { useWindowDimensions } from 'react-native'

export type DimensionContextDataProps = {
  width: number | null
  height: number | null
  scale: number | null
  fontScale: number | null
}

type DimensionContextProviderProps = {
  children: React.ReactNode
}

export const DimensionContext = createContext<DimensionContextDataProps>(
  {} as DimensionContextDataProps,
)

export function DimensionContextProvider({
  children,
}: DimensionContextProviderProps) {
  const [width, setWidth] = useState<number | null>(null)
  const [height, setHeight] = useState<number | null>(null)
  const [scale, setScale] = useState<number | null>(null)
  const dimensions = useWindowDimensions()

  const GetWidthDimensions = useCallback(() => {
    setWidth(dimensions.width)
  }, [dimensions.width])

  const GetHeightDimensions = useCallback(() => {
    setHeight(dimensions.height)
  }, [dimensions.height])

  const GetScaleDimensions = useCallback(() => {
    setScale(dimensions.scale)
  }, [dimensions.scale])

  useEffect(() => {
    GetWidthDimensions()
    GetHeightDimensions()
    GetScaleDimensions()
  }, [GetWidthDimensions, GetHeightDimensions, GetScaleDimensions])

  return (
    <DimensionContext.Provider
      value={{
        width,
        height,
        scale,
        fontScale: dimensions.fontScale,
      }}
    >
      {children}
    </DimensionContext.Provider>
  )
}
