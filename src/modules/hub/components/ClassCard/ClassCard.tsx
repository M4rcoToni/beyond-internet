import React from 'react'
import { CardSubTitle, CardTitle, ClassBanner, Content } from './styles'
import { TouchableOpacity, View } from 'react-native'

interface ClassCardProps {
  title: string
  subTitle: string
  image?: string
  onPress?: () => void
}
export function ClassCard({ image, onPress, title, subTitle }: ClassCardProps) {
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
        <CardTitle>{title}</CardTitle>
        <CardSubTitle>{subTitle}</CardSubTitle>
      </Content>
    </TouchableOpacity>
  )
}
