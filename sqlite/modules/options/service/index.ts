import {
  IOptionsRepository,
  IOptionsService,
  OptionsDTO,
} from '@sqlite/modules/options/interfaces/IOptionsInterface'

export class OptionsService implements IOptionsService {
  private optionsRepository: IOptionsRepository

  constructor(optionsRepository: IOptionsRepository) {
    this.optionsRepository = optionsRepository
  }

  async create(payload: OptionsDTO): Promise<OptionsDTO | null> {
    return await this.optionsRepository.create(payload)
  }

  async update(id: number, data: OptionsDTO): Promise<OptionsDTO | null> {
    return await this.optionsRepository.update(id, data)
  }

  async findById(id: number): Promise<OptionsDTO | null> {
    return await this.optionsRepository.findById(id)
  }

  async list(questionId: number) {
    return await this.optionsRepository.list(questionId)
  }

  async delete(questionId: number) {
    return await this.optionsRepository.delete(questionId)
  }
}
