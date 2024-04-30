import { OptionsDTO } from '@sqlite/modules/options/interfaces/IOptionsInterface'

export interface IOptionsRepository {
  listOptions: (testId: number) => Promise<OptionsDTO[]>
  createOption: (testId: number, questions: string[]) => Promise<boolean>
  updateOption: (id: number, data: OptionsDTO) => Promise<boolean>
  deleteOptions: (testId: number) => Promise<boolean>
}

export interface IOptionsService {
  listOptions: (testId: number) => Promise<OptionsDTO[]>
  createOption: (testId: number, questions: string[]) => Promise<boolean>
  updateOption: (id: number, data: OptionsDTO) => Promise<boolean>
  deleteOptions: (testId: number) => Promise<boolean>
}
