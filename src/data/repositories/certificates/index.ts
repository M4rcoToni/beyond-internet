import { Result } from '@data/result'
import {
  ICertificate,
  ICertificatesRepository,
  ICertificatesService,
} from '@data/interfaces/certificates'

export class CertificatesRepository implements ICertificatesRepository {
  constructor(private readonly certificatesService: ICertificatesService) {}

  async getCertificates(): Promise<ICertificate[]> {
    try {
      return await this.certificatesService.getCertificates()
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
      await this.certificatesService.generateCertificate(courseId, username)
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
