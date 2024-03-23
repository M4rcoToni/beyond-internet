import React from 'react'
import { SubTitleStyled } from './styles'

interface SubTitleProps {
  size?: number
  text: string
}

export function SubTitle({ size, text }: SubTitleProps) {
  return <SubTitleStyled size={size || 16}>{text}</SubTitleStyled>
}
