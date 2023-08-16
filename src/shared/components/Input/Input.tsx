import React from 'react'
import { TextInput, TextInputProps } from 'react-native'

import theme from '../../../shared/theme'

import { InputStyled } from './InputStyled'

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
