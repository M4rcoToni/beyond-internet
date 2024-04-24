import { QuestionsDTO } from "@sqlite/modules/questions/interfaces/IQuestionsInterface"

export class TestsDTO {
  id?: string
  testId?: string
  sectionId: string
  title: string
  completed: boolean
  questions: QuestionsDTO[]
}

export type UpdateTestsDTO = Partial<TestsDTO>

export interface ITestsRepository {
  create(payload: TestsDTO): Promise<TestsDTO | null>
  update(id: number, data: UpdateTestsDTO): Promise<TestsDTO | null>
  findById(id: number): Promise<TestsDTO | null>
  list(): Promise<TestsDTO[]>
  delete(id: number): Promise<boolean>
}

export interface ITestsService {
  create(payload: TestsDTO): Promise<TestsDTO | null>
  update(id: number, data: UpdateTestsDTO): Promise<TestsDTO | null>
  findById(id: number): Promise<TestsDTO | null>
  list(): Promise<TestsDTO[]>
  delete(id: number): Promise<boolean>
}
