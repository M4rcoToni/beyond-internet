import { OptionsDTO } from "@sqlite/modules/options/interfaces/IOptionsInterface"

export class QuestionsDTO {
  questionId?: string
  testId: string
  description: string
  options: OptionsDTO[]
}

export type UpdateQuestionsDTO = Partial<QuestionsDTO>

export interface IQuestionsRepository {
  create(payload: QuestionsDTO): Promise<QuestionsDTO | null>
  update(id: number, data: UpdateQuestionsDTO): Promise<QuestionsDTO | null>
  findById(id: number): Promise<QuestionsDTO | null>
  list(testId: number): Promise<QuestionsDTO[]>
  delete(testId: number): Promise<boolean>
}

export interface IQuestionsService {
  create(payload: QuestionsDTO): Promise<QuestionsDTO | null>
  update(id: number, data: UpdateQuestionsDTO): Promise<QuestionsDTO | null>
  findById(id: number): Promise<QuestionsDTO | null>
  list(testId: number): Promise<QuestionsDTO[]>
  delete(testId: number): Promise<boolean>
}
