import theme from '@ui/theme'
import { SafeAreaView } from 'react-native'
import styled from 'styled-components/native'

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: ${theme.COLORS.WHITE};
`

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 120,
  },
  showsVerticalScrollIndicator: false,
})``

export const CouseDescription = styled.Text`
  font-size: 16px;
  flex-wrap: wrap;
  color: ${theme.COLORS.BLACK};
  margin-top: 10px;
  text-align: left;
  padding: 0 20px;
`
