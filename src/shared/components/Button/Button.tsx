import { TouchableOpacityProps } from 'react-native'

import { Title } from '../Title/Title'
import { ButtonTypeStyleProps, ButtonStyled } from './ButtonStyled'

type Props = TouchableOpacityProps & {
  title: string
  type?: ButtonTypeStyleProps
}

export function Button({ title, type = 'PRIMARY', ...rest }: Props) {
  return (
    <ButtonStyled type={type} {...rest}>
      <Title>{title}</Title>
    </ButtonStyled>
  )
}
