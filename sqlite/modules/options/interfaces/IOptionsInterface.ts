export class OptionsDTO {
  id?: number
  questionId: number
  description: string
}

export type UpdateOptionsDTO = Partial<OptionsDTO>

export interface IOptionsRepository {
  create(payload: OptionsDTO): Promise<OptionsDTO | null>
  update(id: number, data: UpdateOptionsDTO): Promise<OptionsDTO | null>
  findById(id: number): Promise<OptionsDTO | null>
  list(questionId: number): Promise<OptionsDTO[]>
  delete(questionId: number): Promise<boolean>
}

export interface IOptionsService {
  create(payload: OptionsDTO): Promise<OptionsDTO | null>
  update(id: number, data: UpdateOptionsDTO): Promise<OptionsDTO | null>
  findById(id: number): Promise<OptionsDTO | null>
  list(questionId: number): Promise<OptionsDTO[]>
  delete(questionId: number): Promise<boolean>
}
