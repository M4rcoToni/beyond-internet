import { SectionDTO } from "@sqlite/modules/sections/interfaces/ISectionInterface"
import { TestsDTO } from "@sqlite/modules/tests/interfaces/ITestInterface"

export interface ITestsRepository {
  listTest: (sectionId: number) => Promise<TestsDTO[]>
  createTest: (sections: SectionDTO[]) => Promise<boolean>
  updateTest: (id: number, data: TestsDTO) => Promise<boolean> 
  deleteTest: (id: number) => Promise<boolean>
}

export interface ITestsService {
  listTest: (sectionId: number) => Promise<TestsDTO[]>
  createTest: (sections: SectionDTO[]) => Promise<boolean>
  updateTest: (id: number, data: TestsDTO) => Promise<boolean>
  deleteTest: (id: number) => Promise<boolean>
}
