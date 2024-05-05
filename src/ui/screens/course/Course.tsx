import { Image } from 'expo-image'
import { Button, SubTitle } from '@ui/components'
import { Container, Content, CouseDescription } from './styles'
import { ResizeMode, Video } from 'expo-av'
import { useCourseViewModel } from './useCourseViewModel'
import { useNavigation } from '@react-navigation/native'
import { View, Text } from 'react-native'

export function Course() {
  const { course, index, sections, width, courseScrollViewRef } =
    useCourseViewModel()
  const { navigate } = useNavigation()
  if (!course) return <SubTitle size={24} text={'title'} />

  const section = sections[index]
  const imageDir = course.images
  const videoDir = course.videos

  const { images, videos, title, description, tests } = section

  if (!tests) return null

  const test = tests

  return (
    <Container>
      <Content ref={courseScrollViewRef}>
        <SubTitle size={24} text={title} />

        {images && (
          <Image
            alt="Imagem do curso"
            source={{ uri: imageDir + images }}
            contentFit={'contain'}
            style={{
              width: width - 40,
              height: 300,
              alignSelf: 'center',
            }}
          />
        )}

        {videos && (
          <Video
            source={{ uri: videoDir + videos }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            style={{ width, height: 300 }}
          />
        )}

        <CouseDescription>{description}</CouseDescription>

        <View
          style={{
            flex: 1,
            width: '100%',
            padding: 20,
            justifyContent: 'space-between',
            marginVertical: 20,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              color: 'black',
              marginTop: 10,
              textAlign: 'left',
            }}
          >
            {test.completed === 1 ? 'Refaça' : 'Realize'} o teste desta seção:
          </Text>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '500',
              color: 'black',
              marginVertical: 10,
              textAlign: 'left',
            }}
          >
            - {test?.title} {test.completed === 1 && '✅'}
          </Text>
          {test && (
            <Button
              type="PRIMARY"
              title={
                test.completed === 1 ? 'Teste finalizado' : 'Realizar teste'
              }
              onPress={() => {
                navigate('TestRoutes', {
                  screen: 'Test',
                  params: {
                    test,
                  },
                })
              }}
              style={{ height: 50 }}
            />
          )}
        </View>
      </Content>
    </Container>
  )
}
