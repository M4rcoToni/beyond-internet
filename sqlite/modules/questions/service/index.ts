import {
  IQuestionsRepository,
  IQuestionsService,
  QuestionsDTO,
  UpdateQuestionsDTO,
} from '@sqlite/modules/questions/interfaces/IQuestionsInterface'

export class QuestionsService implements IQuestionsService {
  private questionsRepository: IQuestionsRepository

  constructor(questionsRepository: IQuestionsRepository) {
    this.questionsRepository = questionsRepository
  }

  async create(payload: QuestionsDTO): Promise<QuestionsDTO | null> {
    return await this.questionsRepository.create(payload)
  }

  async update(
    id: number,
    data: UpdateQuestionsDTO,
  ): Promise<QuestionsDTO | null> {
    return await this.questionsRepository.update(id, data)
  }

  async findById(id: number): Promise<QuestionsDTO | null> {
    return await this.questionsRepository.findById(id)
  }

  async list(testId: number) {
    return await this.questionsRepository.list(testId)
  }

  async delete(testId: number) {
    return await this.questionsRepository.delete(testId)
  }
}
