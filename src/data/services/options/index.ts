import { IOptionsService } from '@data/interfaces/options'
import { db } from '@sqlite/index'
import { Result } from '@data/result'
import { OptionsDTO } from '@sqlite/modules/options/interfaces/IOptionsInterface'
import { OptionsController } from '@sqlite/modules/options/controller'

import { OptionsService } from '@sqlite/modules/options/service'
import { OptionsRepository } from '@sqlite/modules/options/repository'

export class OptionService implements IOptionsService {
  private Options = new OptionsController(
    new OptionsService(new OptionsRepository(db, 'options')),
  )

  async listOptions(questionId: number): Promise<OptionsDTO[]> {
    const options = await this.Options.list(questionId)

    if (!options) {
      throw new Result(false, null, new Error('Opções não encontradas!'))
    }

    return options
  }

  async createOption(questionId: number, options: string[]): Promise<boolean> {
    const optionsPromises = options.map(async (option) => {
      await this.Options.create({
        questionId,
        description: JSON.parse(option),
      })
    })

    await Promise.all(optionsPromises).catch(() => {
      throw new Result(false, null, new Error('Erro ao criar opções!'))
    })

    return true
  }

  async updateOption(id: number, data: OptionsDTO): Promise<boolean> {
    const updatedOption = await this.Options.update(id, data)

    if (!updatedOption) {
      throw new Result(false, null, new Error('Erro ao atualizar opção!'))
    }

    return true
  }

  async deleteOptions(questionId: number): Promise<boolean> {
    const deletedOptions = await this.Options.delete(questionId)

    if (!deletedOptions) {
      throw new Result(false, null, new Error('Erro ao deletar opções!'))
    }

    return true
  }
}
