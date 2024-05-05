import { QuestionsDTO } from '@sqlite/modules/questions/interfaces/IQuestionsInterface'

export class TestsDTO {
  id?: number
  testId?: number
  sectionId: number
  title: string
  completed: number // 0 - false, 1 - true
  questions?: QuestionsDTO[]
}

export type UpdateTestsDTO = Partial<TestsDTO>

export interface ITestsRepository {
  create(payload: TestsDTO): Promise<boolean>
  update(id: number, data: UpdateTestsDTO): Promise<TestsDTO | null>
  findById(id: number): Promise<TestsDTO | null>
  list(id: number): Promise<TestsDTO>
  delete(id: number): Promise<boolean>
}

export interface ITestsService {
  create(payload: TestsDTO): Promise<boolean>
  update(id: number, data: UpdateTestsDTO): Promise<TestsDTO | null>
  findById(id: number): Promise<TestsDTO | null>
  list(id: number): Promise<TestsDTO>
  delete(id: number): Promise<boolean>
}
