import React, { useMemo } from 'react'
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
  ...rest
}: CourseListProps) {
  const isEmpty = useMemo(
    () => data.length === 0 && isLoadingCourse,
    [data.length, isLoadingCourse],
  )

  return (
    <FlatList
      {...rest}
      contentContainerStyle={{
        flex: 1,
      }}
      data={data}
      refreshing={refreshing}
      // onRefresh={onRefresh}
      keyExtractor={(item) => item.courseId.toString()}
      renderItem={({ item, index }) => (
        <CourseCard
          title={item?.indexFile.name}
          subTitle={`${item?.indexFile?.sections?.length} aulas`}
          image={item.banner}
          isLoading={isOpeningCourse}
          onPress={() => onCoursePress(Number(item.courseId))}
          onLongPress={() => {
            deleteCourse(item.courseId)
          }}
        />
      )}
      // refreshControl={
      //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      // }
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
