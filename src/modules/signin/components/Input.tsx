import { TextInput, TextInputProps } from 'react-native'

import { InputStyled } from '../../../shared/styles/Input'
import theme from '../../../shared/theme'

type Props = TextInputProps & {
  inputRef?: React.RefObject<TextInput>
}

export function Input({ inputRef, ...rest }: Props) {
  return (
    <InputStyled
      ref={inputRef}
      placeholderTextColor={theme.COLORS.WHITE}
      {...rest}
    />
  )
}
