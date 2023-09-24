import React from 'react'
import { CardSubTitle, CardTitle, Content, CourseBanner } from './styles'
import { TouchableOpacity } from 'react-native'

interface CourseCardProps {
  title: string
  subTitle: string
  image?: string
  onPress?: () => void
}

export function CourseCard({
  image,
  onPress,
  title,
  subTitle,
}: CourseCardProps) {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      <Content>
        <CourseBanner
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
