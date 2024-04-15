import { CourseDTO } from '@sqlite/modules/course/interfaces/ICourseInterfaces'
import { SectionDTO } from '@sqlite/modules/sections/interfaces/ISectionInterface'

export interface ICoursesRepository {
  requestPermission: () => Promise<string>
  openCourse: () => Promise<CourseDTO | null>
  createCourse: () => Promise<CourseDTO | null>
  listCourses: () => Promise<CourseDTO[]>
  getCourseById: (id: string) => Promise<CourseDTO | null>
  deleteCourse: (id: string) => Promise<boolean>
  listSections: (courseId: number) => Promise<SectionDTO[]>
}

export interface ICoursesService {
  requestPermission: () => Promise<string>
  openCourse: () => Promise<CourseDTO | null>
  createCourse: () => Promise<CourseDTO | null>
  listCourses: () => Promise<CourseDTO[]>
  getCourseById: (id: string) => Promise<CourseDTO | null>
  deleteCourse: (id: string) => Promise<boolean>
  listSections: (courseId: number) => Promise<SectionDTO[]>
}
