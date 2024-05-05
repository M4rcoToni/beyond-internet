import styled from 'styled-components/native'
import theme from '@ui/theme'

interface TestScreenOptionProps {
  disabled: boolean
  isCorrect: boolean
  isSelected: boolean
}

export const TestScreenNextButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})<TestScreenOptionProps>`
  padding: 10px;
  border-radius: 5px;
  height: 50px;
  justify-content: center;

  background-color: ${({
    isCorrect,
    isSelected,
    disabled,
  }: TestScreenOptionProps) =>
    (isSelected && isCorrect && theme.COLORS.GREEN_700) ||
    (disabled && theme.COLORS.GRAY_300) ||
    theme.COLORS.GREEN_700};
`

export const TestScreenNextButtonText = styled.Text`
  font-size: 16px;
  color: ${theme.COLORS.WHITE};
  text-align: center;
  font-weight: bold;
`
