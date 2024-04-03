import { useRoute } from '@react-navigation/native'
import { Image } from 'expo-image'
import { SubTitle } from '@ui/components'
import { CourseDTO } from '@sqlite/modules/course/interfaces/ICourseInterfaces'
import { useCourse } from '@data/contexts/CourseContext'
import { Container, Content, CouseDescription } from './styles'
import { ResizeMode, Video } from 'expo-av'
import { useMemo } from 'react'
import { Dimensions } from 'react-native'

export function Course() {
  const { section } = useCourse()
  const route = useRoute()

  const { index, courses } = route.params as {
    index: number
    courses: CourseDTO[]
  }
  const width = useMemo(() => {
    return Dimensions.get('window').width
  }, [])

  return (
    <Container>
      <Content>
        <SubTitle size={20} text={section.title} />
        {courses[index].images + section.images !== null && (
          <Image
            alt="Imagem do curso"
            source={{
              uri: courses[index].images + section.images,
            }}
            style={{
              width: 200,
              height: 200,
              alignSelf: 'center',
              backgroundColor: 'red',
            }}
          />
        )}

        {courses[index].videos + section.videos !== null && (
          <Video
            source={{
              uri: courses[index].videos + section.videos,
            }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            style={{ width, height: 300 }}
          />
        )}

        <CouseDescription>{section.description}</CouseDescription>
      </Content>
    </Container>
  )
}
