import { TestsDTO } from '@sqlite/modules/tests/interfaces/ITestInterface'

export interface ITestsRepository {
  listTest: (sectionId: number) => Promise<TestsDTO[]>
  createTest: (sectionId: number, tests: TestsDTO[]) => Promise<boolean>
  updateTest: (sectionId: number, data: TestsDTO) => Promise<boolean>
  deleteTest: (sectionId: number) => Promise<boolean>
}

export interface ITestsService {
  listTest: (sectionId: number) => Promise<TestsDTO[]>
  createTest: (sectionId: number, tests: TestsDTO[]) => Promise<boolean>
  updateTest: (sectionId: number, data: TestsDTO) => Promise<boolean>
  deleteTest: (sectionId: number) => Promise<boolean>
}
