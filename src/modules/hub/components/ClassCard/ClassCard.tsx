import React from 'react'
import { CardSubTitle, ClassBanner, Content } from './styles'
import { TouchableOpacity, View } from 'react-native'

interface ClassCardProps {
  title: string
  image?: string
  onPress?: () => void
}
export function ClassCard({ image, onPress, title }: ClassCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        marginBottom: 20,
      }}
    >
      <Content>
        <ClassBanner
          source={require('../../../../shared/assets/Empreendedorismo.jpg')}
        />
        <CardSubTitle>{title}</CardSubTitle>
      </Content>
    </TouchableOpacity>
  )
}
