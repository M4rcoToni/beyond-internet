import React from 'react'
import { TextInput, TextInputProps, Text } from 'react-native'

import theme from '../../../shared/theme'

import { ErrorMessage, InputStyled } from './InputStyled'

type Props = TextInputProps & {
  inputRef?: React.RefObject<TextInput>
  errorMessage?: string | null
}

export function Input({ errorMessage = null, inputRef, ...rest }: Props) {
  return (
    <>
      <InputStyled
        ref={inputRef}
        placeholderTextColor={theme.COLORS.WHITE}
        {...rest}
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </>
  )
}
