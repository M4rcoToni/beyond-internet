import { Section } from '@ui/screens/course/CourseType'
import React, { createContext, useContext, useState } from 'react'

export type sectionContextDataProps = {
  section: Section
  index: number
  handleSelectSection: (section: Section, index: number) => void
}

type sectionContextProviderProps = {
  children: React.ReactNode
}

export const SectionContext = createContext<sectionContextDataProps>(
  {} as sectionContextDataProps,
)
// TODO change to course provider
export function SectionContextProvider({
  children,
}: sectionContextProviderProps) {
  const [section, setSection] = useState<Section>({} as Section)
  const [index, setIndex] = useState<number>(0)

  function handleSelectSection(section: Section, index: number) {
    setIndex(index)
    setSection(section)
  }

  return (
    <SectionContext.Provider
      value={{
        section,
        index,
        handleSelectSection,
      }}
    >
      {children}
    </SectionContext.Provider>
  )
}

export function useSection() {
  const context = useContext(SectionContext)

  return context
}
