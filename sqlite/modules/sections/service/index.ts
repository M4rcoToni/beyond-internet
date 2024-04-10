import {
  ISectionRepository,
  ISectionService,
  SectionDTO,
} from '../interfaces/ISectionInterface'

export class SectionService implements ISectionService {
  private sectionRepository: ISectionRepository

  constructor(sectionRepository: ISectionRepository) {
    this.sectionRepository = sectionRepository
  }

  async create(payload: SectionDTO): Promise<SectionDTO | null> {
    return await this.sectionRepository.create(payload)
  }

  async update(id: number, data: SectionDTO): Promise<SectionDTO | null> {
    return await this.sectionRepository.update(id, data)
  }

  async findById(id: number): Promise<SectionDTO | null> {
    return await this.sectionRepository.findById(id)
  }

  async list() {
    return await this.sectionRepository.list()
  }

  async delete(id: string) {
    return await this.sectionRepository.delete(id)
  }
}
