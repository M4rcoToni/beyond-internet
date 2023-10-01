import { Section } from '@modules/course/screens/CourseType'
import React, { createContext, useState } from 'react'

export type sectionContextDataProps = {
  section: Section
  handleSelectSection: (section: Section) => Promise<void>
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

  async function handleSelectSection(section: Section) {
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
