export class OptionsDTO {
  id?: number
  questionId: number
  description: string
}

export type PartialOptionsDTO = Partial<OptionsDTO>

export interface IOptionsRepository {
  create(payload: PartialOptionsDTO): Promise<OptionsDTO | null>
  update(id: number, data: PartialOptionsDTO): Promise<OptionsDTO | null>
  findById(id: number): Promise<OptionsDTO | null>
  list(questionId: number): Promise<OptionsDTO[]>
  delete(questionId: number): Promise<boolean>
}

export interface IOptionsService {
  create(payload: PartialOptionsDTO): Promise<OptionsDTO | null>
  update(id: number, data: PartialOptionsDTO): Promise<OptionsDTO | null>
  findById(id: number): Promise<OptionsDTO | null>
  list(questionId: number): Promise<OptionsDTO[]>
  delete(questionId: number): Promise<boolean>
}
