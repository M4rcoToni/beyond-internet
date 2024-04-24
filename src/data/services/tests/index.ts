import { ITestsService } from "@data/interfaces/tests";
import { db } from "@sqlite/index";
import { SectionDTO } from "@sqlite/modules/sections/interfaces/ISectionInterface";
import { TestsController } from "@sqlite/modules/tests/controller";
import { TestsDTO } from "@sqlite/modules/tests/interfaces/ITestInterface";
import { TestsRepository } from "@sqlite/modules/tests/repository";
import { TestService } from "@sqlite/modules/tests/service";

export class TestsService implements ITestsService{
  private Tests = new TestsController(
    new TestService(new TestsRepository(db, 'tests'))
  )
  async listTest(): Promise<TestsDTO[]> {
    return await this.Tests.list()
  }
  async createTest(sections: SectionDTO[]): Promise<boolean> {
    const testsPromises = sections.map(async (section) => {
      await this.Tests.create({
        id: String(section.id),
        sectionId: section.id,
        questions: JSON.stringify(section.questions || []),
      })
    })

    await Promise.all(testsPromises).catch(() => {
      throw new Error('Erro ao criar testes!')
    })

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