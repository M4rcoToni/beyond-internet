import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native'
import theme from '@shared/theme'

export const LinkStyled = styled(TouchableOpacity)`
  width: 100%;

  color: ${theme.COLORS.WHITE};

  font-family: ${theme.FONT_FAMILY.REGULAR};
  font-size: ${theme.FONT_SIZE.MD}px;
`
