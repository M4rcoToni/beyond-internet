import React, { createContext, useEffect, useState, useCallback } from 'react'
import { useWindowDimensions } from 'react-native'

export type DimensionContextDataProps = {
  width: number
  height: number
  scale: number
  fontScale: number
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
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)
  const [scale, setScale] = useState<number>(0)
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
