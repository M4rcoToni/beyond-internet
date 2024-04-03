import { ICoursesService } from '@data/interfaces/course'
import { Result } from '@data/result'
import { db } from '@sqlite/index'
import { CourseController } from '@sqlite/modules/course/controller'
import {
  CourseDTO,
  CourseType,
} from '@sqlite/modules/course/interfaces/ICourseInterfaces'
import { CourseRepository } from '@sqlite/modules/course/repository'
import { CourseService } from '@sqlite/modules/course/service'
import * as FileSystem from 'expo-file-system'

export class CoursesService implements ICoursesService {
  private courseController = new CourseController(
    new CourseService(new CourseRepository(db, 'course')),
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
    console.log(createdCourse, 'createdCourse')

    if (!createdCourse) {
      throw new Result(false, null, new Error('Erro curso já cadastrado!'))
    }

    return createdCourse
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
}
