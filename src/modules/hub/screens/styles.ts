import styled from 'styled-components/native'
import theme from '@shared/theme'
import { View } from 'react-native'

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
