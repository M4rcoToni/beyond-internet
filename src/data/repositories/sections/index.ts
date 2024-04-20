import {
  ISectionsRepository,
  ISectionsService,
} from '@data/interfaces/sections'
import { Result } from '@data/result'
import { SectionDTO } from '@sqlite/modules/sections/interfaces/ISectionInterface'

export class SectionsRepository implements ISectionsRepository {
  constructor(private readonly sectionService: ISectionsService) {}

  async listSections(courseId: number): Promise<SectionDTO[]> {
    try {
      return await this.sectionService.listSections(courseId)
    } catch (error) {
      throw new Result(
        false,
        undefined,
        new Error(
          error instanceof Result
            ? error.getError()?.message
            : 'Erro ao listar seções',
        ),
      )
    }
  }

  async createSection(sections: SectionDTO[]): Promise<boolean> {
    try {
      return await this.sectionService.createSection(sections)
    } catch (error) {
      throw new Result(
        false,
        undefined,
        new Error(
          error instanceof Result
            ? error.getError()?.message
            : 'Erro ao criar seção',
        ),
      )
    }
  }

  async deleteSection(id: number): Promise<boolean> {
    try {
      return await this.sectionService.deleteSection(id)
    } catch (error) {
      throw new Result(
        false,
        undefined,
        new Error(
          error instanceof Result
            ? error.getError()?.message
            : 'Erro ao deletar seção',
        ),
      )
    }
  }
}
