import { ITestsService } from '@data/interfaces/tests'
import { db } from '@sqlite/index'
import { TestsController } from '@sqlite/modules/tests/controller'
import { TestsDTO } from '@sqlite/modules/tests/interfaces/ITestInterface'
import { TestsRepository } from '@sqlite/modules/tests/repository'
import { TestService } from '@sqlite/modules/tests/service'

export class TestsService implements ITestsService {
  private Tests = new TestsController(
    new TestService(new TestsRepository(db, 'tests')),
  )

  async listTest(): Promise<TestsDTO[]> {
    return await this.Tests.list()
  }

  async createTest(sectionId: number, tests: TestsDTO[]): Promise<boolean> {
    const testsPromises = tests.map(async (test) => {
      await this.Tests.create({
        testId: test.id,
        sectionId,
        title: test.title,
        completed: 0,
      })
    })

    await Promise.all(testsPromises).catch(() => {
      throw new Error('Erro ao criar testes!')
    })

    // TODO: Implementar a criação de questions

    return true
  }

  async updateTest(id: number, data: TestsDTO): Promise<boolean> {
    const updatedTest = await this.Tests.update(id, data)

    if (!updatedTest) {
      throw new Error('Erro ao atualizar teste!')
    }

    return true
  }

  async deleteTest(id: number): Promise<boolean> {
    return await this.Tests.delete(id)
  }
}
