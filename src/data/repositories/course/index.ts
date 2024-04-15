import { ICoursesRepository, ICoursesService } from '@data/interfaces/course'
import { Result } from '@data/result'
import { CourseDTO } from '@sqlite/modules/course/interfaces/ICourseInterfaces'

export class CoursesRepository implements ICoursesRepository {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly courseService: ICoursesService) {}
  async openCourse(): Promise<CourseDTO | null> {
    try {
      return await this.courseService.openCourse()
    } catch (error) {
      throw new Result(
        false,
        undefined,
        new Error(
          error instanceof Result
            ? error.getError()?.message
            : 'Erro ao abrir curso',
        ),
      )
    }
  }

  async requestPermission(): Promise<string> {
    try {
      return await this.courseService.requestPermission()
    } catch (error) {
      throw new Result(
        false,
        undefined,
        new Error(
          error instanceof Result
            ? error.getError()?.message
            : 'Erro ao solicitar permissão',
        ),
      )
    }
  }

  async createCourse(): Promise<CourseDTO | null> {
    try {
      return await this.courseService.createCourse()
    } catch (error) {
      throw new Result(
        false,
        undefined,
        new Error(
          error instanceof Result
            ? error.getError()?.message
            : 'Erro ao criar curso',
        ),
      )
    }
  }

  getCourseById(id: string): Promise<CourseDTO | null> {
    try {
      return this.courseService.getCourseById(id)
    } catch (error) {
      throw new Result(
        false,
        undefined,
        new Error(
          error instanceof Result
            ? error.getError()?.message
            : 'Erro ao buscar curso',
        ),
      )
    }
  }

  async listCourses(): Promise<CourseDTO[]> {
    try {
      return this.courseService.listCourses()
    } catch (error) {
      throw new Result(
        false,
        undefined,
        new Error(
          error instanceof Result
            ? error.getError()?.message
            : 'Erro ao listar cursos',
        ),
      )
    }
  }

  async deleteCourse(id: string): Promise<boolean> {
    try {
      return this.courseService.deleteCourse(id)
    } catch (error) {
      throw new Result(
        false,
        undefined,
        new Error(
          error instanceof Result
            ? error.getError()?.message
            : 'Erro ao deletar curso',
        ),
      )
    }
  }

  async listSections(courseId: number) {
    try {
      return this.courseService.listSections(courseId)
    } catch (error) {
      throw new Result(
        false,
        undefined,
        new Error(
          error instanceof Result
            ? error.getError()?.message
            : 'Erro ao listar seções',
        ),
      )
    }
  }
}
