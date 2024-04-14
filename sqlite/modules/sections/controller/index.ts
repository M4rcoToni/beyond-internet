import { SectionDTO } from '../interfaces/ISectionInterface'
import { SectionService } from '../service'

export class SectionController {
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

  async list(): Promise<SectionDTO[]> {
    try {
      return await this.sectionService.list()
    } catch (error) {
      throw new Error()
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      return await this.sectionService.delete(id)
    } catch (error) {
      throw new Error()
    }
  }
}
