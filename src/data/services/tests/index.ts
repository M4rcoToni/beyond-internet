import { db } from '@sqlite/index'
import { TestsController } from '@sqlite/modules/tests/controller'
import { TestsDTO } from '@sqlite/modules/tests/interfaces/ITestInterface'
import { TestsRepository } from '@sqlite/modules/tests/repository'
import { TestService } from '@sqlite/modules/tests/service'
import { ITestsService } from '@data/interfaces/tests'
import { QuestionsSerivce } from '@data/services/questions'

export class TestsService implements ITestsService {
  private testsController = new TestsController(
    new TestService(new TestsRepository(db, 'tests')),
  )

  constructor(private readonly QuestionsService: QuestionsSerivce) {}

  async listTest(sectionId: number): Promise<TestsDTO[]> {
    const test = await this.testsController.list(sectionId)

    if (!test) {
      throw new Error('Testes não encontrados!')
    }

    return test
  }

  async createTest(sectionId: number, tests: TestsDTO): Promise<boolean> {
    console.log('tests', tests)
    console.log('sectionId', sectionId)

    const testPromise = await this.testsController.create({
      testId: tests.id,
      sectionId,
      title: tests.title || '',
      completed: 0,
    })

    if (!testPromise) {
      console.log('Erro ao criar testes!', testPromise)
      throw new Error('Erro ao criar testes!')
    }

    if (tests.questions) {
      await this.QuestionsService.createQuestion(
        tests.id || 99,
        tests.questions,
      )
    }

    return true
  }

  async updateTest(id: number, data: TestsDTO): Promise<boolean> {
    const updatedTest = await this.testsController.update(id, data)

    if (!updatedTest) {
      throw new Error('Erro ao atualizar teste!')
    }

    return true
  }

  async deleteTest(sectionId: number): Promise<boolean> {
    const tests = await this.testsController.list(sectionId)

    const testDeleted = await this.testsController.delete(sectionId)

    if (!testDeleted) {
      throw new Error('Erro ao deletar teste!')
    }

    tests.flatMap(async (test) => {
      await this.QuestionsService.deleteQuestions(test?.testId || 0)
    })

    return true
  }
}
