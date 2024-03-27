import { ICourseService } from '@data/interfaces/course'
import { Result } from '@data/result'
import { UserDTO } from '@sqlite/modules/users/interfaces/IUserInterface'
import * as FileSystem from 'expo-file-system'

export class CourseService implements ICourseService {
  async requestPermission(): Promise<Result<string | null>> {
    try {
      const permissions =
        await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync()

      if (!permissions.granted) {
        return new Result(false, null, new Error('Erro ao solicitar permissão'))
      }

      const uri = permissions.directoryUri

      return new Result(true, uri)
    } catch (error) {
      return new Result(false, null, new Error('Erro ao solicitar permissão'))
    }
  }

  async openCourse(): Promise<Result<UserDTO | null>> {
    try {
      const uri = (await this.requestPermission()).getValue()

      if (!uri) {
        return new Result(
          false,
          null,
          new Error('Sem permissão para abrir curso!'),
        )
      }

      const files = await FileSystem.StorageAccessFramework.readDirectoryAsync(
        uri,
      )

      const index = files.find((file) => {
        console.log(file.indexOf('.json'))
        if (file.indexOf('.json') !== -1) {
          return file
        }
        return new Result(false, null, new Error('Erro ao encontrar o curso!'))
      })

      if (index) {
        const filesContent = await FileSystem.getInfoAsync(index)

        if (filesContent.exists) {
          const content = await FileSystem.readAsStringAsync(filesContent.uri)

          const contentJson = JSON.parse(content)

          const filesJson = JSON.stringify(files)
        }
      }
    } catch (error) {
      return new Result(false, null, new Error('Erro ao abrir curso!'))
    }
    return new Result(true, null)
  }

  createCourse: () => Promise<Result<UserDTO | null>>

  async getCourseById(id: string): Promise<Result<UserDTO | null>> {
    return new Result(false, null, new Error('Erro ao buscar curso'))
  }
}
