import styled from 'styled-components/native'
import theme from '../../../shared/theme'

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  gap: 12px;
  margin-top: 30px;
`

export const Title = styled.Text`
  text-align: center;
  font-size: ${theme.FONT_SIZE.LG}px;
  font-family: ${theme.FONT_FAMILY.REGULAR};
  color: ${theme.COLORS.BLACK};
`
export const Logo = styled.Image`
  width: 180px;
  height: 44px;
  align-self: center;
`
