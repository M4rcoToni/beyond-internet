import { CertificatesRepository } from '@data/repositories/certificates'
import { ICertificate } from '@data/interfaces/certificates'
import { useState } from 'react'
import Toast from 'react-native-toast-message'
import { Result } from '@data/result'
import { useAuth } from '@data/contexts/AuthContext'

export function useCertificateViewModel(
  certificateRepository: CertificatesRepository,
) {
  const [certificates, setCertificates] = useState<ICertificate[]>([])
  const { user } = useAuth()
  const handleOnGetCertificates = async () => {
    try {
      const certificates = await certificateRepository.getCertificates()

      if (certificates) {
        setCertificates(certificates)
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1:
          error instanceof Result
            ? error.getError()?.message
            : 'Erro ao buscar certificados',
      })
    }
  }

  const handleOnGenerateCertificate = async (courseId: string) => {
    try {
      await certificateRepository.generateCertificate(
        courseId,
        user?.name || '',
      )
    } catch (error) {
      Toast.show({
        type: 'error',
        text1:
          error instanceof Result
            ? error.getError()?.message
            : 'Erro ao gerar certificado.ts',
      })
    }
  }

  return {
    certificates,
    handleOnGetCertificates,
    handleOnGenerateCertificate,
  }
}
