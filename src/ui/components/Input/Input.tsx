import React from 'react'
import { TextInput, TextInputProps, Text } from 'react-native'

import { ErrorMessage, InputStyled } from './InputStyled'
import theme from '@ui/theme'

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
