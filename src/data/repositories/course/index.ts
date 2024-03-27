import { ICourseRepository, ICourseService } from '@data/interfaces/course'
import { Result } from '@data/result'
import { UserDTO } from '@sqlite/modules/users/interfaces/IUserInterface'

export class CourseRepository implements ICourseRepository {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly courseService: ICourseService) {}
  async openCourse(): Promise<Result<UserDTO | null>> {
    try {
      return await this.courseService.openCourse()
    } catch (error) {
      throw new Result(false, undefined, new Error('Erro ao abrir curso'))
    }
  }

  async requestPermission(): Promise<Result<string | null>> {
    try {
      return await this.courseService.requestPermission()
    } catch (error) {
      throw new Result(
        false,
        undefined,
        new Error('Erro ao solicitar permissão'),
      )
    }
  }

  createCourse: () => Promise<Result<UserDTO | null>>
  getCourseById: (id: string) => Promise<Result<UserDTO | null>>
}
