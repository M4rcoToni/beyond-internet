import React from 'react'
import { SubTitle } from '../SubTitle/SubTitle'
import { LinkStyled } from './LinkStyled'

interface Link {
  title: string
  onPress: () => void
}

export function Link({ onPress, title }: Link) {
  return (
    <LinkStyled onPress={onPress}>
      <SubTitle>{title}</SubTitle>
    </LinkStyled>
  )
}
