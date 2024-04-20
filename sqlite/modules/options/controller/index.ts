import { OptionsService } from '@sqlite/modules/options/service'
import { OptionsDTO } from '@sqlite/modules/options/interfaces/IOptionsInterface'

export class OptionsController {
  private optionsService: OptionsService

  constructor(optionsService: OptionsService) {
    this.optionsService = optionsService
  }

  async create(payload: OptionsDTO): Promise<OptionsDTO | null> {
    try {
      return await this.optionsService.create(payload)
    } catch (error) {
      throw new Error()
    }
  }

  async update(id: number, data: OptionsDTO): Promise<OptionsDTO | null> {
    try {
      return await this.optionsService.update(id, data)
    } catch (error) {
      throw new Error()
    }
  }

  async findById(id: number): Promise<OptionsDTO | null> {
    try {
      return await this.optionsService.findById(id)
    } catch (error) {
      throw new Error()
    }
  }

  async list(questionId: number): Promise<OptionsDTO[]> {
    try {
      return await this.optionsService.list(questionId)
    } catch (error) {
      throw new Error()
    }
  }

  async delete(questionId: number): Promise<boolean> {
    try {
      return await this.optionsService.delete(questionId)
    } catch (error) {
      throw new Error()
    }
  }
}
