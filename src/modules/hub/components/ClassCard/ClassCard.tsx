import React from 'react'
import { CardSubTitle, CardTitle, ClassBanner, Content } from './styles'
import { TouchableOpacity } from 'react-native'

interface ClassCardProps {
  title: string
  subTitle: string
  image?: string
  onPress?: () => void
}
export function ClassCard({ image, onPress, title, subTitle }: ClassCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Content>
        <ClassBanner
          alt="Empreendedorismo"
          contentFit="cover"
          transition={1000}
          source={{ uri: image }}
        />
        <CardTitle>{title}</CardTitle>
        <CardSubTitle>{subTitle}</CardSubTitle>
      </Content>
    </TouchableOpacity>
  )
}
