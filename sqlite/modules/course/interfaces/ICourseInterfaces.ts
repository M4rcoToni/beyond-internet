import { Result } from '@data/result'

export type CourseDTO = {
  id?: string
  courseId: string
  directoryName: string
  uri: string
  files: string
  index: string
  granted: number
}

export type CreateCourseDTO = {
  courseId: string
  directoryName: string
  uri: string
  files: string
  index: string
  granted: number
}

export interface ICourseRepository {
  create: (payload: CreateCourseDTO) => Promise<CourseDTO | null>
  update: (id: string, data: CourseDTO) => Promise<CourseDTO | null>
  findById: (id: string) => Promise<CourseDTO | null>
}

export interface ICourseService {
  create: (payload: CreateCourseDTO) => Promise<CourseDTO | null>
  update: (id: string, data: CourseDTO) => Promise<CourseDTO | null>

  findById: (id: string) => Promise<CourseDTO | null>
}
