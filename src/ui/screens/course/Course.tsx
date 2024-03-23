import { useRoute } from '@react-navigation/native'
import { CourseType } from './CourseType'
import { Image } from 'expo-image'
import { SubTitle } from '@ui/components'
import { Container } from '../hub/styles'
import { useSection } from '../../../data/hooks/useSection'
import { useStorage } from '../../../data/hooks/useStorage'

type Courses = {
  id?: string | undefined
  courseId: string
  directoryName: string
  uri: string
  files: string
  granted: boolean
  index: CourseType
}
export function Course() {
  const { section } = useSection()
  const route = useRoute()
  const { course } = useStorage()

  const { index } = route.params as { index: number }
  // p0w3rc0d3#@lph@#$%
  return (
    <Container>
      <SubTitle size={20} text={section.title} />
      <SubTitle size={16} text={section.description} />
      <Image
        alt="Imagem do curso"
        source={{
          uri: course[index].files[3] + section.images[0],
        }}
        style={{ width: 200, height: 200, alignSelf: 'center' }}
      />
    </Container>
  )
}
