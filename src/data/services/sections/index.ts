import { ISectionsService } from '@data/interfaces/sections'
import { SectionDTO } from '@sqlite/modules/sections/interfaces/ISectionInterface'
import { Result } from '@data/result'
import { SectionController } from '@sqlite/modules/sections/controller'
import { SectionService } from '@sqlite/modules/sections/service'
import { SectionRepository } from '@sqlite/modules/sections/repository'
import { db } from '@sqlite/index'
import { TestsService } from '@data/services/tests'

export class SectionsService implements ISectionsService {
  private Section = new SectionController(
    new SectionService(new SectionRepository(db, 'sections')),
  )

  constructor(private readonly TestService: TestsService) {}

  async listSections(courseId: number): Promise<SectionDTO[]> {
    const sections = await this.Section.list(courseId)

    const formattedSections = sections.map((item) => ({
      ...item,
      images: JSON.parse(String(item.images)),
      videos: JSON.parse(String(item.videos)),
      pdfs: JSON.parse(String(item.pdfs)),
    }))

    if (!formattedSections) {
      throw new Result(false, null, new Error('Seções não encontradas!'))
    }

    return formattedSections
  }

  async createSection(sections: SectionDTO[]): Promise<boolean> {
    const sectionsPromises = sections.map(async (section) => {
      await this.Section.create({
        id: String(section.id),
        position: section.position,
        courseId: section.courseId,
        title: section.title,
        description: section.description,
        images: JSON.stringify(section.images || []),
        videos: JSON.stringify(section.videos || []),
        pdfs: JSON.stringify(section.pdfs || []),
      })
    })

    await Promise.all(sectionsPromises).catch(() => {
      throw new Result(false, null, new Error('Erro ao criar seções!'))
    })

    sections.flatMap(async (section) => {
      await this.TestService?.createTest(
        Number(section.id),
        section.tests || [],
      )
    })

    return true
  }

  async deleteSection(id: number): Promise<boolean> {
    const deletedSections = await this.Section.delete(Number(id))

    if (!deletedSections) {
      throw new Result(false, null, new Error('Erro ao deletar seções!'))
    }

    return true
  }
}
