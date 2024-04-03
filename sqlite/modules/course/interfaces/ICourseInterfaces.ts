type Question = {
  id: number
  title: string
  questions: any[] // Você pode adicionar a tipagem correta para as perguntas
}

export type Section = {
  id: number
  title: string
  description: string
  images: string[] | null
  videos: string[] | null
  pdfs: string[] | null
  tests: Question[] | null
}

export type CourseType = {
  id: number
  name: string
  sections: Section[]
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
