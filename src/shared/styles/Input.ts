import { TextInput } from 'react-native'

import styled from 'styled-components/native'
import theme from '../theme'

export const InputStyled = styled(TextInput)`
  flex: 1;
  min-height: 56px;
  max-height: 56px;
  max-width: 600 px;

  background-color: ${theme.COLORS.GRAY_300};
  color: ${theme.COLORS.WHITE};

  font-family: ${theme.FONT_FAMILY.REGULAR};
  font-size: ${theme.FONT_SIZE.MD}px;

  border-radius: 6px;
  padding: 16px;
`
