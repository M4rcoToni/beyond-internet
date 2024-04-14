import { CourseDTO } from '@sqlite/modules/course/interfaces/ICourseInterfaces'
import { SectionDTO } from '@sqlite/modules/sections/interfaces/ISectionInterface'
import React, { createContext, useContext, useState } from 'react'

export type courseContextDataProps = {
  courses: CourseDTO[]
  section: SectionDTO
  index: number
  handleSetCourses: (courses: CourseDTO[]) => void
  handleSelectSection: (section: SectionDTO) => void
  handleSetIndex: (index: number) => void
}

type courseContextProviderProps = {
  children: React.ReactNode
}

export const CourseContext = createContext<courseContextDataProps>(
  {} as courseContextDataProps,
)
export function CourseContextProvider({
  children,
}: courseContextProviderProps) {
  const [courses, setCourses] = useState<CourseDTO[]>([])

  const [section, setSection] = useState<SectionDTO>({} as SectionDTO)
  const [index, setIndex] = useState<number>(0)

  const handleSelectSection = (section: SectionDTO) => {
    setSection(section)
  }

  const handleSetIndex = (index: number) => {
    setIndex(index)
  }

  const handleSetCourses = (courses: CourseDTO[]) => {
    setCourses(courses)
  }

  return (
    <CourseContext.Provider
      value={{
        courses,
        section,
        index,
        handleSelectSection,
        handleSetCourses,
        handleSetIndex,
      }}
    >
      {children}
    </CourseContext.Provider>
  )
}

export function useCourse() {
  const context = useContext(CourseContext)

  return context
}
