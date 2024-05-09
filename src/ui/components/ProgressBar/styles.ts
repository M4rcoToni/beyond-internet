import styled from 'styled-components/native'
import theme from '@ui/theme'

export const Container = styled.View`
  height: 20px;
  width: 100%;
  background-color: ${theme.COLORS.GRAY_200};
  margin-top: 10px;
`

type ProgressProps = {
  width: string
}

export const Progress = styled.View<ProgressProps>`
  height: 100%;
  width: ${({ width }: ProgressProps) => width}%;
  background-color: ${theme.COLORS.GREEN_500};
`

export const ProgressText = styled.Text`
  position: absolute;
  align-self: center;
  top: 1px;
  font-size: 14px;
`
