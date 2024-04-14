import { SectionDTO } from '@sqlite/modules/sections/interfaces/ISectionInterface'

export type CourseType = {
  id: number
  name: string
  sections: SectionDTO[]
}

export type CourseDTO = {
  id?: string
  courseId: string
  directoryName: string
  uri: string
  images: string
  videos: string
  pdfs: string
  banner: string
  indexFile: CourseType
  granted: number
}

export type CreateCourseDTO = {
  courseId: string
  directoryName: string
  uri: string
  images: string
  videos: string
  pdfs: string
  banner: string
  indexFile: string
  granted: number
}

export interface ICourseRepository {
  create: (payload: CreateCourseDTO) => Promise<CourseDTO | null>
  update: (id: string, data: CourseDTO) => Promise<CourseDTO | null>
  list: () => Promise<CourseDTO[]>
  findById: (id: string) => Promise<CourseDTO | null>
  delete: (id: string) => Promise<boolean>
}

export interface ICourseService {
  create: (payload: CreateCourseDTO) => Promise<CourseDTO | null>
  update: (id: string, data: CourseDTO) => Promise<CourseDTO | null>
  list: () => Promise<CourseDTO[]>
  findById: (id: string) => Promise<CourseDTO | null>
  delete: (id: string) => Promise<boolean>
}
