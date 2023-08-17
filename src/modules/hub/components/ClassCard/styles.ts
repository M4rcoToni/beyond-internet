import styled from 'styled-components/native'
import theme from '@shared/theme'

export const Content = styled.View`
  justify-content: space-between;
  margin: 10px;
  border-radius: 10px;
  border: 1px solid ${theme.COLORS.BLACK};
`
export const ClassBanner = styled.Image`
  width: 100%;
  height: 130px;
  border-radius: 10px 10px 0 0;
  background-color: white;
`
export const CardSubTitle = styled.Text`
  max-width: 90%;
  padding-top: 5px;
  align-self: center;
  font-size: ${theme.FONT_SIZE.MD}px;
  font-family: ${theme.FONT_FAMILY.REGULAR};
  color: ${theme.COLORS.BLACK};
`
