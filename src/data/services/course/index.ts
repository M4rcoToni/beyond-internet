import { ICoursesService } from '@data/interfaces/course'
import { Result } from '@data/result'
import { db } from '@sqlite/index'
import { CourseController } from '@sqlite/modules/course/controller'
import { CourseDTO } from '@sqlite/modules/course/interfaces/ICourseInterfaces'
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

    const index = files.find((file) => {
      if (file.indexOf('.json') !== -1) {
        return file
      }
      throw new Result(false, null, new Error('Curso não encontrado!'))
    })

    if (index) {
      const filesContent = await FileSystem.getInfoAsync(index)

      if (filesContent.exists) {
        const content = await FileSystem.readAsStringAsync(filesContent.uri)

        const filesJson = JSON.stringify(files)
        const contentJson = JSON.parse(content)

        return {
          courseId: contentJson.id,
          directoryName: contentJson.name,
          uri,
          files: filesJson,
          index: JSON.stringify(contentJson),
          granted: true,
        } as unknown as CourseDTO
      }
    }
    return null
  }

  async createCourse(): Promise<CourseDTO | null> {
    const course = await this.openCourse()

    if (!course) {
      throw new Result(false, null, new Error('Erro ao abrir o curso!'))
    }

    const createdCourse = await this.courseController.create(course)

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
}
