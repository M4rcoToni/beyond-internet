import {
  ITestsRepository,
  ITestsService,
  TestsDTO,
  UpdateTestsDTO,
} from '@sqlite/modules/tests/interfaces/ITestInterface'

export class TestService implements ITestsService {
  private testRepository: ITestsRepository

  constructor(testRepository: ITestsRepository) {
    this.testRepository = testRepository
  }

  async create(payload: TestsDTO): Promise<TestsDTO | null> {
    return await this.testRepository.create(payload)
  }

  async update(id: number, data: UpdateTestsDTO): Promise<TestsDTO | null> {
    return await this.testRepository.update(id, data)
  }

  async findById(id: number): Promise<TestsDTO | null> {
    return await this.testRepository.findById(id)
  }

  async list(id: number) {
    return await this.testRepository.list(id)
  }

  async delete(id: number) {
    return await this.testRepository.delete(id)
  }
}
