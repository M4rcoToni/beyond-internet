import { IQuestionsService } from '@data/interfaces/questions'
import { QuestionsController } from '@sqlite/modules/questions/controller'
import { QuestionsService } from '@sqlite/modules/questions/service'
import { QuestionsRepository } from '@sqlite/modules/questions/repository'
import { db } from '@sqlite/index'
import { Result } from '@data/result'
import { QuestionsDTO } from '@sqlite/modules/questions/interfaces/IQuestionsInterface'
import { OptionService } from '@data/services/options'

export class QuestionsSerivce implements IQuestionsService {
  private Questions = new QuestionsController(
    new QuestionsService(new QuestionsRepository(db, 'questions')),
  )

  constructor(private readonly OptionsService: OptionService) {}

  async listQuestions(testId: number): Promise<QuestionsDTO[]> {
    const questions = await this.Questions.list(testId)

    if (!questions) {
      throw new Result(false, null, new Error('Questões não encontradas!'))
    }

    await Promise.all(
      questions.map(async (question) => {
        question.options = await this.OptionsService.listOptions(
          question.questionId || 0,
        )
      }),
    )

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
        questionId: question.id,
      })

      if (question.options && question.options?.length > 0) {
        const options: string[] = question.options.map((option) =>
          JSON.stringify(option),
        )
        await this.OptionsService.createOption(question.id || 99, options)
      }
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
    const questions = await this.listQuestions(testId)

    if (!questions) {
      throw new Result(false, null, new Error('Questões não encontradas!'))
    }

    const deletedQuestions = await this.Questions.delete(testId)

    if (!deletedQuestions) {
      throw new Result(false, null, new Error('Erro ao deletar questões!'))
    }

    questions.map(async (question) => {
      await this.OptionsService.deleteOptions(question.questionId || 0)
    })

    return true
  }
}
