import React from 'react'
import { FlatList, RefreshControl, StyleProp, ViewStyle } from 'react-native'
import { CourseEmpty } from './CourseEmpty/CourseEmpty'
import { CourseCard } from '../CourseCard/CourseCard'
import { Courses } from '@modules/hub/screens/Hub'
import { Button } from '@shared/components'
import { Section } from '@modules/course/screens/CourseType'

interface CourseListProps {
  data: Courses[]
  refreshing: boolean
  onRefresh: () => void
  getCourse?: () => void
  onCoursePress?: (section: Section) => void
  style?: StyleProp<ViewStyle>
}

export function CourseList({
  data,
  onRefresh,
  refreshing,
  getCourse,
  onCoursePress,
  ...rest
}: CourseListProps) {
  return (
    <FlatList
      {...rest}
      data={data}
      horizontal
      shouldRasterizeIOS
      renderToHardwareTextureAndroid
      refreshing={refreshing}
      keyExtractor={(item) => item.courseId.toString()}
      renderItem={({ item, index }) => (
        <CourseCard
          title={item.index.name}
          subTitle={`${item.index.sections.length} aulas`}
          image={item.files[4]}
          onPress={
            onCoursePress
              ? () => {
                  onCoursePress(item.index.sections[index])
                }
              : undefined
          }
          // onLongPress={() => {
          //   deleteCourse(item.courseId)
          // }}
        />
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListEmptyComponent={() => <CourseEmpty getCourse={getCourse} />}
      ListFooterComponent={() => (
        <Button title="Adicionar curso" onPress={getCourse} />
      )}
    />
  )
}
