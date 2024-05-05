import React, { useEffect } from 'react'
import {
  CardSubTitle,
  CardTitle,
  Content,
  CourseBanner,
  Loading,
} from './styles'
import { ActivityIndicator, TouchableOpacity, View } from 'react-native'
import theme from '@ui/theme'
import { SectionDTO } from '@sqlite/modules/sections/interfaces/ISectionInterface'
import { ProgressBar } from '@components/ProgressBar/ProgressBar'
import { useCourseCardViewModel } from '@components/CourseCard/useCourseCardViewModel'
import { SectionsRepository } from '@data/repositories/sections'
import { SectionsService } from '@data/services/sections'
import { TestsService } from '@data/services/tests'
import { QuestionsSerivce } from '@data/services/questions'
import { OptionService } from '@data/services/options'

interface CourseCardProps {
  title: string
  subTitle: string
  image?: string
  isLoading?: boolean
  onPress?: () => void
  onLongPress?: () => void
  couserId: number
}

export function CourseCard({
  couserId,
  image,
  onPress,
  title,
  subTitle,
  isLoading = false,
  onLongPress,
}: CourseCardProps) {
  const { handleListSections, totalSections, completedSections } =
    useCourseCardViewModel(
      new SectionsRepository(
        new SectionsService(
          new TestsService(new QuestionsSerivce(new OptionService())),
        ),
      ),
    )

  useEffect(() => {
    ;(async () => {
      await handleListSections(couserId)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        <ProgressBar
          completedSections={completedSections}
          totalSections={totalSections}
        />
        <CardTitle>{title}</CardTitle>
      </Content>
      {isLoading && (
        <Loading>
          <ActivityIndicator size="large" color={theme.COLORS.GREEN_500} />
        </Loading>
      )}
    </TouchableOpacity>
  )
}
