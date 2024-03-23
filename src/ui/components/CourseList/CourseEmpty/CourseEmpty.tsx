import { View } from 'react-native'
import { Button, SubTitle } from '@ui/components'
import { Divider } from './styles'
import Lamp from '@assets/folder.svg'

interface CourseEmptyProps {
  getCourse?: () => Promise<void>
}

export function CourseEmpty({ getCourse }: CourseEmptyProps) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <SubTitle size={22} text="Nenhum curso encontrado" />
      <Divider />
      <SubTitle size={16} text="Voce pode abrir um curso no botão abaixo" />
      <Divider />
      <Lamp width={120} height={120} />
      <Button
        title="Buscar curso"
        onPress={getCourse}
        style={{
          width: 160,
          height: 50,
        }}
      />
    </View>
  )
}
