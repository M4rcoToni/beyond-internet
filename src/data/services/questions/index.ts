import { IQuestionsService } from '@data/interfaces/questions'
import { QuestionsController } from '@sqlite/modules/questions/controller'
import { QuestionsService } from '@sqlite/modules/questions/service'
import { QuestionsRepository } from '@sqlite/modules/questions/repository'
import { db } from '@sqlite/index'
import { Result } from '@data/result'
import { QuestionsDTO } from '@sqlite/modules/questions/interfaces/IQuestionsInterface'

export class QuestionsSerivce implements IQuestionsService {
  private Questions = new QuestionsController(
    new QuestionsService(new QuestionsRepository(db, 'questions')),
  )

  async listQuestions(testId: number): Promise<QuestionsDTO[]> {
    const questions = await this.Questions.list(testId)

    if (!questions) {
      throw new Result(false, null, new Error('Questões não encontradas!'))
    }

    return questions
  }

  async createQuestion(
    testId: number,
    questions: QuestionsDTO[],
  ): Promise<boolean> {
    const questionsPromises = questions.map(async (question) => {
      await this.Questions.create({
        testId,
        description: question.description,
        answer: question.answer,
      })
    })

    await Promise.all(questionsPromises).catch(() => {
      throw new Result(false, null, new Error('Erro ao criar questões!'))
    })

    return true
  }

  async updateQuestion(id: number, data: QuestionsDTO): Promise<boolean> {
    const updatedQuestion = await this.Questions.update(id, data)

    if (!updatedQuestion) {
      throw new Result(false, null, new Error('Erro ao atualizar questão!'))
    }

    return true
  }

  async deleteQuestions(testId: number): Promise<boolean> {
    const deletedQuestions = await this.Questions.delete(testId)

    if (!deletedQuestions) {
      throw new Result(false, null, new Error('Erro ao deletar questões!'))
    }

    return true
  }
}
