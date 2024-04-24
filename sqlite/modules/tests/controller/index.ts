import { TestsDTO } from '../interfaces/ITestInterface'
import { TestService } from '../service'

export class TestsController {
  private testsService: TestService

  constructor(testsService: TestService) {
    this.testsService = testsService
  }

  async create(payload: TestsDTO): Promise<TestsDTO | null> {
    try {
      return await this.testsService.create(payload)
    } catch (error) {
      throw new Error()
    }
  }

  async update(id: number, data: TestsDTO): Promise<TestsDTO | null> {
    try {
      return await this.testsService.update(id, data)
    } catch (error) {
      throw new Error()
    }
  }

  async findById(id: number): Promise<TestsDTO | null> {
    try {
      return await this.testsService.findById(id)
    } catch (error) {
      throw new Error()
    }
  }

  async list(): Promise<TestsDTO[]> {
    try {
      return await this.testsService.list()
    } catch (error) {
      throw new Error()
    }
  }

  async delete(courseId: number): Promise<boolean> {
    try {
      return await this.testsService.delete(courseId)
    } catch (error) {
      throw new Error()
    }
  }
}
