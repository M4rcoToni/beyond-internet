import {
  ICertificate,
  ICertificatesService,
} from '@data/interfaces/certificates'
import { Result } from '@data/result'
import * as Print from 'expo-print'
import * as Sharing from 'expo-sharing'
import { CoursesRepository } from '@data/repositories/course'
import { CertificadoHtml } from '@assets/certificado'

export class CertificatesService implements ICertificatesService {
  constructor(private readonly courseRepository: CoursesRepository) {}

  async getCertificates(): Promise<ICertificate[]> {
    try {
      const courses = await this.courseRepository.listCourses()

      const certificates: ICertificate[] = courses.map((course) => {
        return {
          courseId: course.courseId,
          courseName: course.indexFile.name,
          completionPercentage: course.completionPercentage,
          courseImage: course.banner,
          completionDate: null, // TODO: add to course completion date
        } as ICertificate
      })

      return certificates
    } catch (error) {
      throw new Result(
        false,
        undefined,
        new Error(
          error instanceof Result
            ? error.getError()?.message
            : 'Erro ao buscar certificados',
        ),
      )
    }
  }

  async generateCertificate(courseId: string, username: string): Promise<void> {
    try {
      console.log(courseId, username, 'generateCertificate')
      const course = await this.courseRepository.getCourseById(courseId)

      if (!course) {
        throw new Result(false, undefined, new Error('Curso não encontrado!'))
      }

      const hasCompleted = course.completionPercentage === 100

      if (!hasCompleted) {
        throw new Result(
          false,
          undefined,
          new Error('Curso não foi concluído!'),
        )
      }

      const name = username
      const date = new Date().toLocaleDateString('pt-BR') // TODO: change to course completion date
      const code = require('crypto').randomBytes(12).toString('hex')

      const htmlWithValues = CertificadoHtml.replace('{{name}}', name)
        .replace('{{date}}', date)
        .replace('{{code}}', code)

      const { uri } = await Print.printToFileAsync({
        html: htmlWithValues,
        base64: false,
      })

      await Sharing.shareAsync(uri, {
        mimeType: 'application/pdf',
        dialogTitle: 'My PDF',
      })
    } catch (error) {
      throw new Result(
        false,
        undefined,
        new Error(
          error instanceof Result
            ? error.getError()?.message
            : 'Erro ao gerar certificado.ts',
        ),
      )
    }
  }
}
