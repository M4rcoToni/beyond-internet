import { ITestsRepository, ITestsService } from "@data/interfaces/tests";
import { Result } from "@data/result";
import { SectionDTO } from "@sqlite/modules/sections/interfaces/ISectionInterface";
import { TestsDTO } from "@sqlite/modules/tests/interfaces/ITestInterface";

export class TestsRepository implements ITestsRepository{
  constructor(private readonly testService: ITestsService) {}

  async listTest(sectionId: number): Promise<TestsDTO[]> {
    try {
      return await this.testService.listTest(sectionId)
    } catch (error) {
      throw new Result(
        false,
        undefined,
        new Error(
          error instanceof Result
            ? error.getError()?.message
            : 'Erro ao listar testes',
        ),
      )
    }
  }

  async createTest(tests: SectionDTO[]): Promise<boolean> {
    try {
      return await this.testService.createTest(tests)
    } catch (error) {
      throw new Result(
        false,
        undefined,
        new Error(
          error instanceof Result
            ? error.getError()?.message
            : 'Erro ao criar teste',
        ),
      )
    }
  }

  async updateTest(id: number, data: TestsDTO): Promise<boolean> {
    try {
      return await this.testService.updateTest(id, data)
    } catch (error) {
      throw new Result(
        false,
        undefined,
        new Error(
          error instanceof Result
            ? error.getError()?.message
            : 'Erro ao atualizar teste',
        ),
      )
    }
  }

  async deleteTest(id: number): Promise<boolean> {
    try {
      return await this.testService.deleteTest(id)
    } catch (error) {
      throw new Result(
        false,
        undefined,
        new Error(
          error instanceof Result
            ? error.getError()?.message
            : 'Erro ao deletar teste',
        ),
      )
    }
  }


}