import { TestsDTO } from '@sqlite/modules/tests/interfaces/ITestInterface'

export class SectionDTO {
  id?: string
  position: number
  courseId: string
  title: string
  description: string
  images: string | null
  videos: string | null
  pdfs: string | null
  tests?: TestsDTO
}

export type UpdateSectionDTO = Partial<SectionDTO>

export interface ISectionRepository {
  create(payload: SectionDTO): Promise<SectionDTO | null>
  update(id: number, data: UpdateSectionDTO): Promise<SectionDTO | null>
  findById(id: number): Promise<SectionDTO | null>
  list(courseId: number): Promise<SectionDTO[]>
  delete(courseId: number): Promise<boolean>
}

export interface ISectionService {
  create(payload: SectionDTO): Promise<SectionDTO | null>
  update(id: number, data: UpdateSectionDTO): Promise<SectionDTO | null>
  findById(id: number): Promise<SectionDTO | null>
  list(courseId: number): Promise<SectionDTO[]>
  delete(courseId: number): Promise<boolean>
}
