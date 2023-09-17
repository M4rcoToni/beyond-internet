import styled from 'styled-components/native'
import theme from '@shared/theme'
import { FlatList } from 'react-native'

export const FlatListStyled = styled(FlatList)`
  flex: 1;
  background-color: ${theme.COLORS.WHITE};
`
export const Container = styled.View`
  flex: 1;
  justify-content: center;
  gap: 10px;
  flex-direction: row;
  flex-wrap: wrap;
  background-color: ${theme.COLORS.WHITE};
`
