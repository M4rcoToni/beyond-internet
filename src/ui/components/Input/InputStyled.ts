import { TextInput } from 'react-native'

import styled from 'styled-components/native'
import theme from '@ui/theme'

export const InputStyled = styled(TextInput)`
  width: 100%;
  max-width: 400px;

  min-height: 56px;
  max-height: 56px;

  background-color: ${theme.COLORS.GRAY_300};
  color: ${theme.COLORS.WHITE};

  font-family: ${theme.FONT_FAMILY.REGULAR};
  font-size: ${theme.FONT_SIZE.MD}px;

  border-radius: 6px;
  padding-left: 16px;
`
export const ErrorMessage = styled.Text`
  align-self: flex-start;
  padding-left: 6px;
  font-size: ${theme.FONT_SIZE.SM}px;
  color: ${theme.COLORS.BLACK};
`
