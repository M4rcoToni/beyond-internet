import { useRoute } from '@react-navigation/native'
import { Image } from 'expo-image'
import { SubTitle, Container } from '@ui/components'
import { useSection } from '@data/contexts/SectionContext'
import { CourseDTO } from '@sqlite/modules/course/interfaces/ICourseInterfaces'

export function Course() {
  const { section } = useSection()
  const route = useRoute()

  const { index, courses } = route.params as {
    index: number
    courses: CourseDTO[]
  }
  console.log('index', courses[index].files[3] + section.images[1])

  return (
    <Container>
      <SubTitle size={20} text={section.title} />
      <SubTitle size={16} text={section.description} />
      <Image
        alt="Imagem do curso"
        source={{
          uri: courses[index].files[3] + section.images[index],
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
