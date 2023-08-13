import { TouchableOpacityProps } from 'react-native'

import {
  ButtonStyled,
  ButtonTypeStyleProps,
} from '../../../shared/styles/Button'
import { Title } from '../../../shared/styles/Title'

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
