import { QuestionsDTO } from '@sqlite/modules/questions/interfaces/IQuestionsInterface'

export interface IQuestionsRepository {
  listQuestions: (testId: number) => Promise<QuestionsDTO[]>
  createQuestion: (
    testId: number,
    questions: QuestionsDTO[],
  ) => Promise<boolean>
  updateQuestion: (id: number, data: QuestionsDTO) => Promise<boolean>
  deleteQuestions: (testId: number) => Promise<boolean>
}

export interface IQuestionsService {
  listQuestions: (testId: number) => Promise<QuestionsDTO[]>
  createQuestion: (
    testId: number,
    questions: QuestionsDTO[],
  ) => Promise<boolean>
  updateQuestion: (id: number, data: QuestionsDTO) => Promise<boolean>
  deleteQuestions: (testId: number) => Promise<boolean>
}
