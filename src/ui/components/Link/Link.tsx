import React from 'react'
import { SubTitle } from '../SubTitle/SubTitle'
import { LinkStyled } from './LinkStyled'

interface Link {
  title: string
  onPress: () => void
  testID?: string
}

export function Link({ onPress, title, testID }: Link) {
  return (
    <LinkStyled onPress={onPress} testID={testID}>
      <SubTitle text={title} />
    </LinkStyled>
  )
}
