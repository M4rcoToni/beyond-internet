import { QuestionsService } from '@sqlite/modules/questions/service'
import { QuestionsDTO } from '@sqlite/modules/questions/interfaces/IQuestionsInterface'

export class QuestionsController {
  private questionsService: QuestionsService

  constructor(questionsService: QuestionsService) {
    this.questionsService = questionsService
  }

  async create(payload: QuestionsDTO): Promise<QuestionsDTO | null> {
    try {
      return await this.questionsService.create(payload)
    } catch (error) {
      throw new Error()
    }
  }

  async update(id: number, data: QuestionsDTO): Promise<QuestionsDTO | null> {
    try {
      return await this.questionsService.update(id, data)
    } catch (error) {
      throw new Error()
    }
  }

  async findById(id: number): Promise<QuestionsDTO | null> {
    try {
      return await this.questionsService.findById(id)
    } catch (error) {
      throw new Error()
    }
  }

  async list(testId: number): Promise<QuestionsDTO[]> {
    try {
      return await this.questionsService.list(testId)
    } catch (error) {
      throw new Error()
    }
  }

  async delete(testId: number): Promise<boolean> {
    try {
      return await this.questionsService.delete(testId)
    } catch (error) {
      throw new Error()
    }
  }
}
