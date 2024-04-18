import { SectionService } from '@sqlite/modules/sections/service'
import { SectionDTO } from '@sqlite/modules/sections/interfaces/ISectionInterface'

export class TestsController {
  private sectionService: SectionService

  constructor(sectionService: SectionService) {
    this.sectionService = sectionService
  }

  async create(payload: SectionDTO): Promise<SectionDTO | null> {
    try {
      return await this.sectionService.create(payload)
    } catch (error) {
      throw new Error()
    }
  }

  async update(id: number, data: SectionDTO): Promise<SectionDTO | null> {
    try {
      return await this.sectionService.update(id, data)
    } catch (error) {
      throw new Error()
    }
  }

  async findById(id: number): Promise<SectionDTO | null> {
    try {
      return await this.sectionService.findById(id)
    } catch (error) {
      throw new Error()
    }
  }

  async list(courseId: number): Promise<SectionDTO[]> {
    try {
      return await this.sectionService.list(courseId)
    } catch (error) {
      throw new Error()
    }
  }

  async delete(courseId: number): Promise<boolean> {
    try {
      return await this.sectionService.delete(courseId)
    } catch (error) {
      throw new Error()
    }
  }
}
