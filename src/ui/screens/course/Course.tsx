import { Image } from 'expo-image'
import { SubTitle } from '@ui/components'
import { Container, Content, CouseDescription } from './styles'
import { ResizeMode, Video } from 'expo-av'
import { useCourseViewModel } from './useCourseViewModel'

export function Course() {
  const { course, index, sections, width } = useCourseViewModel()

  if (!course) {
    return null
  }

  return (
    <Container>
      <Content>
        <SubTitle size={20} text={sections[index].title} />
        {course?.images + sections[index].images !== null && (
          <Image
            alt="Imagem do curso"
            source={{
              uri: course?.images + sections[index].images,
            }}
            style={{
              width: 200,
              height: 200,
              alignSelf: 'center',
              backgroundColor: 'red',
            }}
          />
        )}

        {course?.videos + sections[index].videos !== null && (
          <Video
            source={{
              uri: course?.videos + sections[index].videos,
            }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            style={{ width, height: 300 }}
          />
        )}

        <CouseDescription>{sections[index].description}</CouseDescription>
      </Content>
    </Container>
  )
}
