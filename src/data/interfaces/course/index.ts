import { Result } from '@data/result'
import { UserDTO } from '@sqlite/modules/users/interfaces/IUserInterface'

export interface ICourseRepository {
  requestPermission: () => Promise<Result<string | null>>
  openCourse: () => Promise<Result<UserDTO | null>>
  createCourse: () => Promise<Result<UserDTO | null>>
  getCourseById: (id: string) => Promise<Result<UserDTO | null>>
}

export interface ICourseService {
  requestPermission: () => Promise<Result<string | null>>
  openCourse: () => Promise<Result<UserDTO | null>>
  createCourse: () => Promise<Result<UserDTO | null>>
  getCourseById: (id: string) => Promise<Result<UserDTO | null>>
}
