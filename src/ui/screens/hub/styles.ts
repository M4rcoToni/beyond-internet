import styled from 'styled-components/native'
import { View } from 'react-native'
import theme from '@ui/theme'

export const Content = styled.View`
  flex: 1;
  background-color: ${theme.COLORS.WHITE};
  align-items: center;
`

export const Container = styled(View)`
  justify-content: center;
  gap: 10px;
  flex-wrap: wrap;
`
