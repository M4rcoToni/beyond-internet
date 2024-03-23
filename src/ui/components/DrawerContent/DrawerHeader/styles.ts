import styled from 'styled-components/native'
import theme from '@ui/theme'

export const Container = styled.View`
  flex: 1;
  justify-content: 'center';
  align-items: 'center';
  align-self: center;
  padding: 20px;
`

export const Title = styled.Text`
  padding-top: 20px;
  align-self: center;
  font-size: ${theme.FONT_SIZE.XL}px;
  font-family: ${theme.FONT_FAMILY.REGULAR};
  color: ${theme.COLORS.BLACK};
`

export const SubTitle = styled.Text`
  align-self: center;
  font-size: ${theme.FONT_SIZE.MD}px;
  font-family: ${theme.FONT_FAMILY.REGULAR};
  color: ${theme.COLORS.BLACK};
`
