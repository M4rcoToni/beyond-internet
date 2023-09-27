import React from 'react'
import { FlatList, RefreshControl, StyleProp, ViewStyle } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { CourseEmpty } from './CourseEmpty/CourseEmpty'
import { CourseCard } from '../CourseCard/CourseCard'
import { Courses } from '@modules/hub/screens/Hub'

interface CourseListProps {
  data: Courses[]
  refreshing: boolean
  onRefresh: () => void
  getCourse?: () => void
  style?: StyleProp<ViewStyle>
}

export function CourseList({
  data,
  onRefresh,
  refreshing,
  getCourse,
  ...rest
}: CourseListProps) {
  const { navigate } = useNavigation()
  return (
    <FlatList
      {...rest}
      data={data}
      horizontal
      shouldRasterizeIOS
      renderToHardwareTextureAndroid
      refreshing={refreshing}
      keyExtractor={(item) => item.courseId.toString()}
      renderItem={({ item }) => (
        <CourseCard
          title={item.directoryName}
          subTitle={`${item.id} aulas`}
          image={item.files[4]}
          onPress={() => {
            navigate('Course', { item })
          }}
        />
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListEmptyComponent={() => <CourseEmpty getCourse={getCourse} />}
    />
  )
}
