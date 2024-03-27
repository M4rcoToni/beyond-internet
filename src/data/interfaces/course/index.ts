import { CourseDTO } from '@sqlite/modules/course/interfaces/ICourseInterfaces'

export interface ICoursesRepository {
  requestPermission: () => Promise<string>
  openCourse: () => Promise<CourseDTO | null>
  createCourse: () => Promise<CourseDTO | null>
  getCourseById: (id: string) => Promise<CourseDTO | null>
}

export interface ICoursesService {
  requestPermission: () => Promise<string>
  openCourse: () => Promise<CourseDTO | null>
  createCourse: () => Promise<CourseDTO | null>
  getCourseById: (id: string) => Promise<CourseDTO | null>
}
