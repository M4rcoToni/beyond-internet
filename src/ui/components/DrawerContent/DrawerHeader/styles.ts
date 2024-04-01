import styled from 'styled-components/native'
import theme from '@ui/theme'
import { SafeAreaView } from 'react-native-safe-area-context'

export const Container = styled(SafeAreaView)`
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

export const PictureContainer = styled.View`
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: lightgray;
  border-radius: 50px;
`
