import React, { useCallback } from 'react'
import { FlatList, Text } from 'react-native'
import { Container, SubTitle, Separator, Button } from '@ui/components'
import { useCourseContentViewModel } from './useCourseContentViewModel'
import { SectionDTO } from '@sqlite/modules/sections/interfaces/ISectionInterface'
import { CourseItem } from './CourseItem'
interface CourseContentProps {
  sections: SectionDTO[]
  courseName: string
  onPressBackButton: () => void
  closeDrawer: () => void
}
interface RenderItemProps {
  item: SectionDTO
  index: number
}

export function CourseContent({
  sections,
  courseName,
  onPressBackButton,
  closeDrawer,
}: CourseContentProps) {
  const { handleSetIndex, sectionIndex, courseScrollViewRef } =
    useCourseContentViewModel()

  const renderItem = useCallback(
    ({ item, index }: RenderItemProps) => {
      const handlePress = () => {
        handleSetIndex(index)
        courseScrollViewRef?.current?.scrollTo({
          y: 0,
          animated: true,
        })
        closeDrawer()
      }

      return (
        <CourseItem
          item={item}
          onPress={handlePress}
          isSelected={sectionIndex === index}
        />
      )
    },
    [handleSetIndex, courseScrollViewRef, closeDrawer, sectionIndex],
  )

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
        keyExtractor={(item) => item.position.toString()}
        ListHeaderComponent={() => (
          <>
            <SubTitle size={32} text={courseName} />
            <Text
              style={{ fontSize: 24, textAlign: 'center', marginBottom: 20 }}
            >
              Seções feitas{' '}
              {
                sections.filter((section) => section.tests?.completed === 1)
                  .length
              }{' '}
              / {sections.length}
            </Text>
          </>
        )}
        renderItem={renderItem}
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
