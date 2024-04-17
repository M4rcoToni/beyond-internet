import React from 'react'
import {
  CardSubTitle,
  CardTitle,
  Content,
  CourseBanner,
  Loading,
} from './styles'
import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import theme from '@ui/theme'

interface CourseCardProps {
  title: string
  subTitle: string
  image?: string
  isLoading?: boolean
  onPress?: () => void
  onLongPress?: () => void
}

export function CourseCard({
  image,
  onPress,
  title,
  subTitle,
  isLoading = false,
  onLongPress,
}: CourseCardProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      onLongPress={onLongPress}
      delayLongPress={500}
      disabled={isLoading}
    >
      <Content>
        <CourseBanner
          alt="course banner"
          contentFit="cover"
          transition={400}
          source={{ uri: image }}
        />
        <CardTitle>{title}</CardTitle>
        <CardSubTitle>{subTitle}</CardSubTitle>
      </Content>
      {isLoading && (
        <Loading>
          <ActivityIndicator size="large" color={theme.COLORS.GREEN_700} />
        </Loading>
      )}
    </TouchableOpacity>
  )
}
