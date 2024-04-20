import { QuestionsDTO } from '@sqlite/modules/questions/interfaces/IQuestionsInterface'

export interface IQuestionsRepository {
  listQuestions: (testId: number) => Promise<QuestionsDTO[]>
  createQuestion: (questions: QuestionsDTO[]) => Promise<boolean>
  deleteQuestions: (testId: number) => Promise<boolean>
}

export interface IQuestionsService {
  listQuestions: (testId: number) => Promise<QuestionsDTO[]>
  createQuestion: (questions: QuestionsDTO[]) => Promise<boolean>
  deleteQuestions: (testId: number) => Promise<boolean>
}
