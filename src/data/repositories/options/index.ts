import { IOptionsRepository, IOptionsService } from '@data/interfaces/options'
import { OptionsDTO } from '@sqlite/modules/options/interfaces/IOptionsInterface'
import { Result } from '@data/result'

export class OptionsRepository implements IOptionsRepository {
  constructor(private readonly optionsService: IOptionsService) {}

  async listOptions(questionId: number) {
    try {
      return await this.optionsService.listOptions(questionId)
    } catch (error) {
      throw new Result(
        false,
        undefined,
        new Error(
          error instanceof Result
            ? error.getError()?.message
            : 'Erro ao listar opções',
        ),
      )
    }
  }

  async createOption(questionId: number, questions: string[]) {
    try {
      return await this.optionsService.createOption(questionId, questions)
    } catch (error) {
      throw new Result(
        false,
        undefined,
        new Error(
          error instanceof Result
            ? error.getError()?.message
            : 'Erro ao criar opção',
        ),
      )
    }
  }

  async updateOption(id: number, data: OptionsDTO) {
    try {
      return await this.optionsService.updateOption(id, data)
    } catch (error) {
      throw new Result(
        false,
        undefined,
        new Error(
          error instanceof Result
            ? error.getError()?.message
            : 'Erro ao atualizar opção',
        ),
      )
    }
  }

  async deleteOptions(questionId: number) {
    try {
      return await this.optionsService.deleteOptions(questionId)
    } catch (error) {
      throw new Result(
        false,
        undefined,
        new Error(
          error instanceof Result
            ? error.getError()?.message
            : 'Erro ao deletar opções',
        ),
      )
    }
  }
}
