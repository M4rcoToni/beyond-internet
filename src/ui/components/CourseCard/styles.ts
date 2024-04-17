import styled from 'styled-components/native'
import theme from '@ui/theme'
import { Image } from 'expo-image'

export const Content = styled.View`
  justify-content: space-between;
  margin: 10px;
  border-radius: 10px;
  border: 1px solid ${theme.COLORS.GRAY_200};
  width: 230px;
  height: 200px;
  background-color: ${theme.COLORS.WHITE};
`
export const CourseBanner = styled(Image)`
  width: 100%;
  height: 130px;
  border-radius: 10px 10px 0 0;
`

export const CardTitle = styled.Text`
  padding: 2% 2% 0 0;

  align-self: center;
  font-size: ${theme.FONT_SIZE.MD}px;
  font-family: ${theme.FONT_FAMILY.REGULAR};
  color: ${theme.COLORS.BLACK};
`

export const CardSubTitle = styled.Text`
  max-width: 80%;
  padding: 0 2% 2% 0;
  align-self: center;
  font-size: ${theme.FONT_SIZE.SM}px;
  font-family: ${theme.FONT_FAMILY.REGULAR};
  color: ${theme.COLORS.BLACK};
`

export const Loading = styled.View`
  margin: 10px;
  position: absolute;
  width: 230px;
  height: 200px;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.192);
  border-radius: 8px;
  z-index: 2;
`
