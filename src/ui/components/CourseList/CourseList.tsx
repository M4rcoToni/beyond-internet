import React from 'react'
import { FlatList, RefreshControl, StyleProp, ViewStyle } from 'react-native'
import { CourseEmpty } from './CourseEmpty/CourseEmpty'
import { CourseCard } from '../CourseCard/CourseCard'
import { Courses } from '@modules/hub/screens/Hub'
import { Button } from '@ui/components'
import { Section } from '@modules/course/screens/CourseType'

interface CourseListProps {
  data: Courses[]
  refreshing: boolean
  onRefresh: () => void
  getCourse?: () => void
  deleteCourse: (courseId: string) => void
  onCoursePress: (section: Section, index: number) => void
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
      // horizontal
      refreshing={refreshing}
      onRefresh={onRefresh}
      keyExtractor={(item) => item.courseId.toString()}
      renderItem={({ item, index }) => (
        <CourseCard
          title={item.index.name}
          subTitle={`${item.index.sections.length} aulas`}
          image={item.files[2]}
          onPress={() => onCoursePress(item.index.sections[index], index)}
          onLongPress={() => {
            deleteCourse(item.courseId)
          }}
        />
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListEmptyComponent={() => <CourseEmpty getCourse={getCourse} />}
      // ListFooterComponent={() => (
      //   <Button title="Adicionar curso" onPress={getCourse} />
      // )}
    />
  )
}
