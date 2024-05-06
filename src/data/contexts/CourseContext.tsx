import { CourseDTO } from '@sqlite/modules/course/interfaces/ICourseInterfaces'
import { SectionDTO } from '@sqlite/modules/sections/interfaces/ISectionInterface'
import React, {
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react'
import { FlatList, ScrollView } from 'react-native'

export type courseContextDataProps = {
  courses: CourseDTO[]
  sections: SectionDTO[]
  index: number
  courseId: string
  handleSetCourses: (courses: CourseDTO[]) => void
  handleSetSection: (section: SectionDTO[]) => void
  handleSetIndex: (index: number) => void
  handleSetCourseId: (courseId: string) => void
  courseScrollViewRef?: React.RefObject<ScrollView>
  hubFlatListRef?: React.RefObject<FlatList>
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

  const [sections, setSections] = useState<SectionDTO[]>([])
  const [index, setIndex] = useState<number>(0)
  const [courseId, setCourseId] = useState<string>('')
  const courseScrollViewRef = useRef<ScrollView>(null)
  const hubFlatListRef = useRef<FlatList>(null)

  const handleSetIndex = (index: number) => {
    setIndex(index)
  }

  const handleSetCourseId = (courseId: string) => {
    setCourseId(courseId)
  }

  const handleSetCourses = useCallback((courses: CourseDTO[]) => {
    setCourses(courses)
  }, [])

  const handleSetSection = useCallback((sections: SectionDTO[]) => {
    setSections(sections)
  }, [])

  return (
    <CourseContext.Provider
      value={{
        courses,
        sections,
        index,
        courseId,
        handleSetCourses,
        handleSetCourseId,
        handleSetIndex,
        handleSetSection,
        courseScrollViewRef,
        hubFlatListRef,
      }}
    >
      {children}
    </CourseContext.Provider>
  )
}

export function useCourse() {
  return useContext(CourseContext)
}
