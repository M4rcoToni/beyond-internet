import React, { useEffect } from 'react'
import { FlatList } from 'react-native'
import { Container } from '@ui/components'
import { useCertificateViewModel } from '@screens/certificate/useCertificateViewModel'
import { CertificatesRepository } from '@data/repositories/certificates'
import { CoursesRepository } from '@data/repositories/course'
import { CoursesService } from '@data/services/course'
import { CertificatesService } from '@data/services/certificates'
import { CertificateCard } from '@components/CertificateCard/CertificateCard'
import Toast from 'react-native-toast-message'

export function Certificate() {
  const { certificates, handleOnGetCertificates, handleOnGenerateCertificate } =
    useCertificateViewModel(
      new CertificatesRepository(
        new CertificatesService(new CoursesRepository(new CoursesService())),
      ),
    )

  useEffect(() => {
    ;(async () => {
      await handleOnGetCertificates()
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Container>
      <FlatList
        data={certificates}
        renderItem={({ item }) => (
          <CertificateCard
            certificate={item}
            onPress={() => handleOnGenerateCertificate(item.courseId)}
          />
        )}
        keyExtractor={(item) => item.courseId}
      />
      <Toast />
    </Container>
  )
}
