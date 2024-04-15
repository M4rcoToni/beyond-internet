import * as FileSystem from 'expo-file-system'
import { ICoursesService } from '@data/interfaces/course'
import { Result } from '@data/result'
import { db } from '@sqlite/index'
import {
  CourseDTO,
  CourseType,
} from '@sqlite/modules/course/interfaces/ICourseInterfaces'
import { CourseController } from '@sqlite/modules/course/controller'
import { CourseRepository } from '@sqlite/modules/course/repository'
import { CourseService } from '@sqlite/modules/course/service'

import { SectionController } from '@sqlite/modules/sections/controller'
import { SectionRepository } from '@sqlite/modules/sections/repository'
import { SectionService } from '@sqlite/modules/sections/service'
import { SectionDTO } from '@sqlite/modules/sections/interfaces/ISectionInterface'

export class CoursesService implements ICoursesService {
  private courseController = new CourseController(
    new CourseService(new CourseRepository(db, 'course')),
  )

  private Section = new SectionController(
    new SectionService(new SectionRepository(db, 'sections')),
  )

  async requestPermission(): Promise<string> {
    try {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync()
      console.log(permissions)

      if (!permissions.granted) {
        throw new Result(false, null, new Error('Erro sem permissão!'))
      }

      const uri = permissions.directoryUri

      return uri
    } catch (error) {
      throw new Result(false, null, new Error('Erro ao solicitar permissão!'))
    }
  }

  async openCourse(): Promise<CourseDTO | null> {
    const uri = await this.requestPermission()

    if (!uri) {
      throw new Result(
        false,
        null,
        new Error('Sem permissão para abrir curso!'),
      )
    }

    const files = await FileSystem.StorageAccessFramework.readDirectoryAsync(
      uri,
    )
    const foundIndex = files.find((file) => file.indexOf('.json') !== -1)
    const foundBanner = files.find((file) => file.indexOf('banner') !== -1)
    const foundImages = files.find((file) => file.indexOf('imagens') !== -1)
    const foundVideos = files.find((file) => file.indexOf('videos') !== -1)
    const foundPdfs = files.find((file) => file.indexOf('pdfs') !== -1)

    if (
      !foundIndex ||
      !foundBanner ||
      !foundImages ||
      !foundVideos ||
      !foundPdfs
    ) {
      throw new Result(false, null, new Error('Curso não encontrado!'))
    }

    const index = foundIndex
    const banner = foundBanner
    const images = foundImages
    const videos = foundVideos
    const pdfs = foundPdfs

    if (index) {
      const filesContent = await FileSystem.getInfoAsync(index)

      if (filesContent.exists) {
        const content = await FileSystem.readAsStringAsync(filesContent.uri)

        const contentJson = JSON.parse(content)

        return {
          courseId: contentJson.id,
          directoryName: contentJson.name,
          uri,
          images: String(images),
          videos: String(videos),
          pdfs: String(pdfs),
          banner: String(banner),
          indexFile: contentJson,
          granted: 1,
        } as CourseDTO
      }
    }
    return null
  }

  async createCourse(): Promise<CourseDTO | null> {
    const course = await this.openCourse()

    if (!course) {
      throw new Result(false, null, new Error('Erro ao abrir o curso!'))
    }

    const createdCourse = await this.courseController.create({
      ...course,
      indexFile: JSON.stringify(course.indexFile),
    })

    if (!createdCourse) {
      throw new Result(false, null, new Error('Erro curso já cadastrado!'))
    }

    course?.indexFile.sections.map(async (section) => {
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

    return course
  }

  async getCourseById(id: string): Promise<CourseDTO | null> {
    const course = await this.courseController.findById(id)

    if (!course) {
      throw new Result(false, null, new Error('Curso não encontrado!'))
    }

    return course
  }

  async listCourses(): Promise<CourseDTO[]> {
    const courses = await this.courseController.list()

    const formattedCourses = courses.map((item) => ({
      ...item,
      indexFile: JSON.parse(String(item.indexFile)) as CourseType,
    }))

    if (!formattedCourses) {
      throw new Result(false, null, new Error('Cursos não encontrados!'))
    }

    return formattedCourses
  }

  async deleteCourse(id: string): Promise<boolean> {
    const deletedCourse = await this.courseController.delete(id)

    if (!deletedCourse) {
      throw new Result(false, null, new Error('Erro ao deletar curso!'))
    }

    return true
  }

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
}
