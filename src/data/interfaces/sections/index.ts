import { SectionDTO } from '@sqlite/modules/sections/interfaces/ISectionInterface'

export interface ISectionsRepository {
  listSections: (courseId: number) => Promise<SectionDTO[]>
  createSection: (sections: SectionDTO[]) => Promise<boolean>
  deleteSection: (id: number) => Promise<boolean>
}

export interface ISectionsService {
  listSections: (courseId: number) => Promise<SectionDTO[]>
  createSection: (sections: SectionDTO[]) => Promise<boolean>
  deleteSection: (id: number) => Promise<boolean>
}
