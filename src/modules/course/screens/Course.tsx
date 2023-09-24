import { useDimensions } from '@shared/hooks/useDimensions'
import { useRoute } from '@react-navigation/native'
import { Content } from '@modules/hub/screens/styles'
import { Container } from '@shared/components'

type Content = {
  name: string
  classes: number
  image: string
}

export function Course() {
  const { width } = useDimensions()
  const route = useRoute()

  const { item } = route.params as { item: Content }
  console.log(item)

  return (
    <Content>
      <Container
        style={
          width > 700 ?? {
            flexDirection: 'row',
          }
        }
      />
    </Content>
  )
}
