import {
  ActivityIndicator,
  StyleProp,
  TouchableOpacityProps,
} from 'react-native'

import { Title } from '../Title/Title'
import { ButtonTypeStyleProps, ButtonStyled } from './ButtonStyled'

type Props = TouchableOpacityProps & {
  title: string
  type?: ButtonTypeStyleProps
  isLoading?: boolean
}

export function Button({
  title,
  type = 'PRIMARY',
  isLoading = false,
  style,
  ...rest
}: Props) {
  return (
    <ButtonStyled type={type} {...rest} style={style}>
      {isLoading ? (
        <ActivityIndicator size="small" color="#fff" />
      ) : (
        <Title>{title}</Title>
      )}
    </ButtonStyled>
  )
}
