import React from 'react'
import { SubTitleStyled } from './styles'
import { TextProps } from 'react-native'

interface SubTitleProps extends TextProps {
  size?: number
  text: string
}

export function SubTitle({ size, text }: SubTitleProps) {
  return <SubTitleStyled size={size || 16}>{text}</SubTitleStyled>
}
