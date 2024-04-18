export class TestsDTO {
  testId?: string
  title: string
  completed: boolean
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
