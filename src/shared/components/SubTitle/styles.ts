import styled from 'styled-components/native'
import theme from '@shared/theme'

type SubTitleProps = {
  size?: number
}

export const SubTitleStyled = styled.Text`
  text-align: center;
  font-size: ${({ size }: SubTitleProps) => size}px;
  font-family: ${theme.FONT_FAMILY.REGULAR};
  color: ${theme.COLORS.BLACK};
`
