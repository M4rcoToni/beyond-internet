import {
  CourseDTO,
  CreateCourseDTO,
  ICourseService,
} from '../interfaces/ICourseInterfaces'

export class CourseController {
  private courseService: ICourseService

  constructor(courseService: ICourseService) {
    this.courseService = courseService
  }

  async create(payload: CreateCourseDTO): Promise<CourseDTO | null> {
    try {
      return await this.courseService.create(payload)
    } catch (error) {
      throw new Error()
    }
  }

  async update(id: string, data: CourseDTO): Promise<CourseDTO | null> {
    try {
      return await this.courseService.update(id, data)
    } catch (error) {
      throw new Error()
    }
  }

  async findById(id: string): Promise<CourseDTO | null> {
    try {
      return await this.courseService.findById(id)
    } catch (error) {
      throw new Error()
    }
  }
}
