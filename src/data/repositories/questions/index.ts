import {
  IQuestionsRepository,
  IQuestionsService,
} from '@data/interfaces/questions'
import { QuestionsDTO } from '@sqlite/modules/questions/interfaces/IQuestionsInterface'
import { Result } from '@data/result'

export class QuestionsRepository implements IQuestionsRepository {
  constructor(private readonly questionService: IQuestionsService) {}

  async listQuestions(testId: number): Promise<QuestionsDTO[]> {
    try {
      return await this.questionService.listQuestions(testId)
    } catch (error) {
      throw new Result(
        false,
        undefined,
        new Error(
          error instanceof Result
            ? error.getError()?.message
            : 'Erro ao listar questões',
        ),
      )
    }
  }

  async createQuestion(
    testId: number,
    questions: QuestionsDTO[],
  ): Promise<boolean> {
    try {
      return await this.questionService.createQuestion(testId, questions)
    } catch (error) {
      throw new Result(
        false,
        undefined,
        new Error(
          error instanceof Result
            ? error.getError()?.message
            : 'Erro ao criar questão',
        ),
      )
    }
  }

  async updateQuestion(id: number, data: QuestionsDTO): Promise<boolean> {
    try {
      return await this.questionService.updateQuestion(id, data)
    } catch (error) {
      throw new Result(
        false,
        undefined,
        new Error(
          error instanceof Result
            ? error.getError()?.message
            : 'Erro ao atualizar questão',
        ),
      )
    }
  }

  async deleteQuestions(testId: number): Promise<boolean> {
    try {
      return await this.questionService.deleteQuestions(testId)
    } catch (error) {
      throw new Result(
        false,
        undefined,
        new Error(
          error instanceof Result
            ? error.getError()?.message
            : 'Erro ao deletar questões',
        ),
      )
    }
  }
}
