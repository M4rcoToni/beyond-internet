import React, { useCallback, useMemo } from 'react'
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleProp,
  ViewStyle,
} from 'react-native'
import { CourseEmpty } from './CourseEmpty/CourseEmpty'
import { CourseCard } from '../CourseCard/CourseCard'
import { Button } from '@ui/components'
import { CourseDTO } from '@sqlite/modules/course/interfaces/ICourseInterfaces'
import { SectionDTO } from '@sqlite/modules/sections/interfaces/ISectionInterface'
import theme from '@ui/theme'

interface CourseListProps {
  data: CourseDTO[]
  refreshing: boolean
  onRefresh: () => void
  getCourse?: () => void
  deleteCourse: (courseId: string) => void
  onCoursePress: (courseId: number) => Promise<void>
  isLoadingCourse?: boolean
  isOpeningCourse?: boolean
  style?: StyleProp<ViewStyle>
  ref?: React.RefObject<FlatList<CourseDTO>>
}

interface RenderItemProps {
  item: CourseDTO
  index: number
}

export function CourseList({
  data,
  onRefresh,
  refreshing,
  getCourse,
  onCoursePress,
  deleteCourse,
  isLoadingCourse,
  isOpeningCourse,
  ref,
  ...rest
}: CourseListProps) {
  const isEmpty = useMemo(
    () => data.length === 0 && isLoadingCourse,
    [data.length, isLoadingCourse],
  )

  const renderItem = useCallback(
    ({ item, index }: RenderItemProps) => (
      <CourseCard
        title={item?.indexFile.name}
        subTitle={`${item?.indexFile?.sections?.length} aulas`}
        image={item.banner}
        couserId={Number(item.courseId)}
        isLoading={isOpeningCourse}
        onPress={() => onCoursePress(Number(item.courseId))}
        onLongPress={() => {
          deleteCourse(item.courseId)
        }}
        completionPercentage={item?.completionPercentage || 0}
      />
    ),
    [deleteCourse, isOpeningCourse, onCoursePress],
  )

  return (
    <FlatList
      {...rest}
      ref={ref}
      contentContainerStyle={{
        flex: 1,
      }}
      data={data}
      refreshing={refreshing}
      keyExtractor={(item) => item.courseId.toString()}
      renderItem={renderItem}
      ListEmptyComponent={
        isEmpty ? (
          <ActivityIndicator size="large" color={theme.COLORS.GREEN_500} />
        ) : (
          <CourseEmpty getCourse={getCourse} />
        )
      }
    />
  )
}
