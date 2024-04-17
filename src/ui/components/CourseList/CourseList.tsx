import React, { useMemo } from 'react'
import { FlatList, RefreshControl, StyleProp, ViewStyle } from 'react-native'
import { CourseEmpty } from './CourseEmpty/CourseEmpty'
import { CourseCard } from '../CourseCard/CourseCard'
import { Button } from '@ui/components'
import { CourseDTO } from '@sqlite/modules/course/interfaces/ICourseInterfaces'
import { SectionDTO } from '@sqlite/modules/sections/interfaces/ISectionInterface'

interface CourseListProps {
  data: CourseDTO[]
  refreshing: boolean
  onRefresh: () => void
  getCourse?: () => void
  deleteCourse: (courseId: string) => void
  onCoursePress: (courseId: number) => Promise<void>
  isLoadingCourse?: boolean
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
  ...rest
}: CourseListProps) {
  return (
    // TODO: Implement FlashList and change loading
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
          isLoading={isLoadingCourse}
          onPress={() => onCoursePress(Number(item.courseId))}
          onLongPress={() => {
            deleteCourse(item.courseId)
          }}
        />
      )}
      // refreshControl={
      //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      // }
      ListEmptyComponent={() => <CourseEmpty getCourse={getCourse} />}
    />
  )
}
