import React from 'react'
import { FlatList, View } from 'react-native'
import { Container, SubTitle, Separator, Button } from '@ui/components'
import { useCourseContentViewModel } from './useCourseContentViewModel'
import { CourseItem } from './CourseItem'
import { Section } from '@sqlite/modules/course/interfaces/ICourseInterfaces'

interface CourseContentProps {
  sections: Section[]
  courseName: string
  onPressBackButton: () => void
  closeDrawer: () => void
}

export function CourseContent({
  sections,
  courseName,
  onPressBackButton,
  closeDrawer,
}: CourseContentProps) {
  const { handleSelectSection } = useCourseContentViewModel()

  return (
    <Container>
      <FlatList
        style={{
          width: '100%',
          height: 780,
        }}
        data={sections}
        renderToHardwareTextureAndroid
        maxToRenderPerBatch={1}
        windowSize={4}
        initialNumToRender={2}
        onEndReachedThreshold={0.5}
        scrollEventThrottle={2}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => <SubTitle size={32} text={courseName} />}
        renderItem={({ item }) => (
          <CourseItem
            item={item}
            onPress={() => {
              handleSelectSection(item)
              closeDrawer()
            }}
          />
        )}
        ItemSeparatorComponent={Separator}
      />
      <Button
        title="Voltar"
        onPress={onPressBackButton}
        style={{
          width: 90,
          height: 50,
          alignSelf: 'center',
          position: 'absolute',
          bottom: 10,
          marginBottom: '10%',
        }}
      />
    </Container>
  )
}
