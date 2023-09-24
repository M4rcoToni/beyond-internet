import { View } from 'react-native'
import Lamp from '@assets/folder.svg'
import { Button, SubTitle } from '@shared/components'
import { Divider } from './styles'

interface ClassEmptyProps {
  getCourse?: () => void
}

export function ClassEmpty({ getCourse }: ClassEmptyProps) {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
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
