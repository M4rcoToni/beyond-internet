import { ICertificate } from '@data/interfaces/certificates'
import { View, Text, Alert } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { Feather } from '@expo/vector-icons'
import theme from '@ui/theme'
import {
  CardContainer,
  CompletionBadge,
  CourseName,
  Divider,
} from '@components/CertificateCard/styles'

interface CertificateCardProps {
  certificate: ICertificate
  onPress?: () => void
}

export function CertificateCard({
  certificate,
  onPress,
}: CertificateCardProps) {
  const hasCompletionDate = certificate.completionDate

  return (
    <CardContainer
      onPress={() => {
        if (hasCompletionDate && onPress) {
          onPress()
        } else {
          Alert.alert('Aviso', 'Curso não finalizado!')
        }
      }}
    >
      <Image
        alt={certificate.courseName}
        source={{ uri: certificate.courseImage }}
        style={{ width: 50, height: 50 }}
        transition={200}
      />
      <Divider />
      <View>
        <CourseName>{certificate.courseName}</CourseName>
        <Text>Porcentagem: {certificate.completionPercentage}%</Text>
        <Text>
          Data de conclusão:{' '}
          {certificate.completionDate
            ? certificate.completionDate
            : 'Não finalizado'}
        </Text>
      </View>
      <CompletionBadge hasCompletionDate={hasCompletionDate}>
        <Feather
          name={hasCompletionDate ? 'save' : 'lock'}
          size={24}
          color={hasCompletionDate ? theme.COLORS.WHITE : theme.COLORS.BLACK}
        />
      </CompletionBadge>
    </CardContainer>
  )
}
