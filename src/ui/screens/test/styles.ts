import styled from 'styled-components/native'
import theme from '@ui/theme'
import { SafeAreaView } from 'react-native-safe-area-context'

export const TestScreenContainer = styled(SafeAreaView)`
  flex: 1;
  padding: 24px;
  background-color: ${theme.COLORS.WHITE};
`

export const TestScreenTitle = styled.Text`
  font-size: 24px;
  font-weight: bold;
`

export const TestScreenSubtitle = styled.Text`
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 24px;
`

export const QuestionDescription = styled.Text`
  font-size: 20px;
  font-weight: 500;
  margin-bottom: 24px;
  margin-top: 12px;
`

export const TestScreenNextButton = styled.TouchableOpacity`
  padding: 10px;
  background-color: ${theme.COLORS.GREEN_700};
  border-radius: 5px;
  height: 50px;
  justify-content: center;
`

export const TestScreenNextButtonText = styled.Text`
  font-size: 16px;
  color: ${theme.COLORS.WHITE};
  text-align: center;
`

export const QuestionContainer = styled.View`
  flex: 1;
  justify-content: space-between;
`
