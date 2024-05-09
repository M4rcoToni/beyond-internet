import React from 'react'
import { CardTitle, Content, CourseBanner, Loading } from './styles'
import { ActivityIndicator, TouchableOpacity } from 'react-native'
import theme from '@ui/theme'
import { ProgressBar } from '@components/ProgressBar/ProgressBar'

interface CourseCardProps {
  title: string
  subTitle: string
  image?: string
  isLoading?: boolean
  onPress?: () => void
  onLongPress?: () => void
  couserId: number
  completionPercentage: number
}

const CourseCard = React.memo(
  ({
    image,
    onPress,
    title,
    isLoading = false,
    onLongPress,
    completionPercentage,
  }: CourseCardProps) => {
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
          <ProgressBar completionPercentage={completionPercentage} />
          <CardTitle>{title}</CardTitle>
        </Content>
        {isLoading && (
          <Loading>
            <ActivityIndicator size="large" color={theme.COLORS.GREEN_500} />
          </Loading>
        )}
      </TouchableOpacity>
    )
  },
)

CourseCard.displayName = 'CourseCard'

export { CourseCard }
