import { ISectionsService } from '@data/interfaces/sections'
import { SectionDTO } from '@sqlite/modules/sections/interfaces/ISectionInterface'
import { Result } from '@data/result'
import { SectionController } from '@sqlite/modules/sections/controller'
import { SectionService } from '@sqlite/modules/sections/service'
import { SectionRepository } from '@sqlite/modules/sections/repository'
import { db } from '@sqlite/index'
import { TestsService } from '@data/services/tests'

export class SectionsService implements ISectionsService {
  private sectionController = new SectionController(
    new SectionService(new SectionRepository(db, 'sections')),
  )

  constructor(private readonly TestService: TestsService) {}

  async listSections(courseId: number): Promise<SectionDTO[]> {
    const sections = await this.sectionController.list(courseId)

    const formattedSections = sections.map((item) => ({
      ...item,
      images: JSON.parse(String(item.images)),
      videos: JSON.parse(String(item.videos)),
      pdfs: JSON.parse(String(item.pdfs)),
    }))

    const testsPromises = formattedSections.map(async (section) => {
      const tests = await this.TestService?.listTest(Number(section.id))
      if (tests) {
        section.tests = tests
      }
    })
    await Promise.all(testsPromises).catch((e) => {
      console.log('error', e)
      throw new Result(false, null, new Error('Erro ao buscar testes!'))
    })

    if (!formattedSections) {
      throw new Result(false, null, new Error('Seções não encontradas!'))
    }

    return formattedSections
  }

  async createSection(sections: SectionDTO[]): Promise<boolean> {
    const sectionsPromises = sections.map(async (section) => {
      await this.sectionController.create({
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

    await Promise.all(sectionsPromises).catch((e) => {
      console.log('error', e)
      throw new Result(false, null, new Error('Erro ao criar seções!'))
    })

    const testsPromises = sections.map(async (section) => {
      await this.TestService?.createTest(Number(section.id), section.tests)
    })

    await Promise.all(testsPromises).catch((e) => {
      console.log('error', e)
      throw new Result(false, null, new Error('Erro ao criar testes!'))
    })

    return true
  }

  async findSectionById(id: number): Promise<SectionDTO | null> {
    const section = await this.sectionController.findById(id)

    if (!section) {
      throw new Result(false, null, new Error('Seção não encontrada!'))
    }

    return section
  }

  async deleteSection(courseId: number): Promise<boolean> {
    const sections = await this.listSections(Number(courseId))

    if (!sections) {
      throw new Result(
        false,
        null,
        new Error('Erro Seção não encontrada ao deletar!'),
      )
    }

    const deletedSections = await this.sectionController.delete(
      Number(courseId),
    )

    if (!deletedSections) {
      throw new Result(false, null, new Error('Erro ao deletar seções!'))
    }

    sections.flatMap(async (section) => {
      await this.TestService?.deleteTest(Number(section.id) || 0)
    })

    return true
  }
}
