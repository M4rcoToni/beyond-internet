import { Section } from '@ui/screens/course/CourseType'
import React, { createContext, useEffect, useState } from 'react'

export type sectionContextDataProps = {
  section: Section
  handleSelectSection: (section: Section) => void
}

type sectionContextProviderProps = {
  children: React.ReactNode
}

export const SectionContext = createContext<sectionContextDataProps>(
  {} as sectionContextDataProps,
)

export function SectionContextProvider({
  children,
}: sectionContextProviderProps) {
  const [section, setSection] = useState<Section>({} as Section)

  function handleSelectSection(section: Section) {
    setSection(section)
  }

  return (
    <SectionContext.Provider
      value={{
        section,
        handleSelectSection,
      }}
    >
      {children}
    </SectionContext.Provider>
  )
}
