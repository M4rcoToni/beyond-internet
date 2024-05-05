import { Image } from 'expo-image'
import { Button, SubTitle } from '@ui/components'
import { Container, Content, CouseDescription } from './styles'
import { ResizeMode, Video } from 'expo-av'
import { useCourseViewModel } from './useCourseViewModel'
import { useNavigation } from '@react-navigation/native'

export function Course() {
  const { course, index, sections, width } = useCourseViewModel()
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
      <Content>
        <SubTitle size={24} text={title} />

        {images && (
          <Image
            alt="Imagem do curso"
            source={{ uri: imageDir + images }}
            style={{
              width: 200,
              height: 200,
              alignSelf: 'center',
              backgroundColor: 'red',
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

        <SubTitle text={test?.title} />
        {test && (
          <Button
            type="PRIMARY"
            title="Iniciar Teste"
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
      </Content>
    </Container>
  )
}
