import { useRoute } from '@react-navigation/native'
import { Image } from 'expo-image'
import { SubTitle, Container } from '@ui/components'
import { CourseDTO } from '@sqlite/modules/course/interfaces/ICourseInterfaces'
import { useCourse } from '@data/contexts/CourseContext'

export function Course() {
  const { section } = useCourse()
  const route = useRoute()

  const { index, courses } = route.params as {
    index: number
    courses: CourseDTO[]
  }

  return (
    <Container>
      <SubTitle size={20} text={section.title} />
      <SubTitle size={16} text={section.description} />
      <Image
        alt="Imagem do curso"
        source={{
          uri: courses[index].files[3] + section.images,
        }}
        style={{
          width: 200,
          height: 200,
          alignSelf: 'center',
          backgroundColor: 'red',
        }}
      />
    </Container>
  )
}
