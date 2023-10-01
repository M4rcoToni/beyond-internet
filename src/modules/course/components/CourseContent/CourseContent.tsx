import React from 'react'
import { FlatList, View, TouchableOpacity } from 'react-native'
import { Container, SubTitle, Separator, Button } from '@shared/components'
import { Section } from '@modules/course/screens/CourseType'

interface CourseContentProps {
  sections: Section[]
  courseName: string
  onPressBackButton: () => void
  onSessionPress: (section: Section) => void
}

export function CourseContent({
  sections,
  courseName,
  onPressBackButton,
  onSessionPress,
}: CourseContentProps) {
  return (
    <>
      <FlatList
        style={{
          width: '100%',
          height: 780,
        }}
        data={sections}
        shouldRasterizeIOS
        renderToHardwareTextureAndroid
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={() => (
          <>
            <Container>
              <SubTitle size={32} text={courseName} />
            </Container>
            <Separator />
          </>
        )}
        renderItem={({ item }) => (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <TouchableOpacity
              onPress={() => onSessionPress(item)}
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingVertical: 16,
                paddingLeft: 14,
              }}
            >
              <SubTitle size={16} text={`${item.title}`} />
            </TouchableOpacity>
          </View>
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
    </>
  )
}
