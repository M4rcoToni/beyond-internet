import styled from 'styled-components/native'
import theme from '@shared/theme'

export const Content = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  gap: 14px;
  margin-top: 30px;
`

export const Title = styled.Text`
  text-align: center;
  font-size: 30px;
  font-family: ${theme.FONT_FAMILY.REGULAR};
  color: ${theme.COLORS.BLACK};
  padding-bottom: 20px;
`
export const Logo = styled.Image`
  width: 180px;
  height: 44px;
  align-self: center;
`
