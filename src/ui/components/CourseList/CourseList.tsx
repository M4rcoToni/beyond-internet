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
  onCoursePress: (section: SectionDTO, index: number) => void
  style?: StyleProp<ViewStyle>
}

export function CourseList({
  data,
  onRefresh,
  refreshing,
  getCourse,
  onCoursePress,
  deleteCourse,
  ...rest
}: CourseListProps) {
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
          onPress={() => onCoursePress(item?.indexFile.sections[index], index)}
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
