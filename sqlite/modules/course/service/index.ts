import {
  CourseDTO,
  CreateCourseDTO,
  ICourseRepository,
  ICourseService,
} from '../interfaces/ICourseInterfaces'

export class CourseService implements ICourseService {
  private courseRepository: ICourseRepository

  constructor(courseRepository: ICourseRepository) {
    this.courseRepository = courseRepository
  }

  async create(payload: CreateCourseDTO): Promise<CourseDTO | null> {
    return await this.courseRepository.create(payload)
  }

  async update(id: string, data: CourseDTO): Promise<CourseDTO | null> {
    return await this.courseRepository.update(id, data)
  }

  async findById(id: string): Promise<CourseDTO | null> {
    return await this.courseRepository.findById(id)
  }
}
