export class SectionDTO {
  id?: string
  order: number
  courseId: string
  title: string
  description: string
  images: string | null
  videos: string | null
  pdfs: string | null
}

export type UpdateSectionDTO = Partial<SectionDTO>

export interface ISectionRepository {
  create(payload: SectionDTO): Promise<SectionDTO | null>
  update(id: number, data: UpdateSectionDTO): Promise<SectionDTO | null>
  findById(id: number): Promise<SectionDTO | null>
  list(): Promise<SectionDTO[]>
  delete(id: string): Promise<boolean>
}

export interface ISectionService {
  create(payload: SectionDTO): Promise<SectionDTO | null>
  update(id: number, data: UpdateSectionDTO): Promise<SectionDTO | null>
  findById(id: number): Promise<SectionDTO | null>
  list(): Promise<SectionDTO[]>
  delete(id: string): Promise<boolean>
}
