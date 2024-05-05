import styled from 'styled-components/native'
import theme from '@ui/theme'

interface SectionTextProps {
  isSelected: boolean
  isCompleted: boolean
}

export const SectionText = styled.Text<SectionTextProps>`
  text-align: center;
  font-size: 16px;
  font-weight: ${({ isSelected }: SectionTextProps) =>
    isSelected ? 700 : 500};

  color: ${({ isSelected, isCompleted }: SectionTextProps) =>
    isSelected
      ? theme.COLORS.GREEN_700
      : isCompleted
      ? theme.COLORS.GRAY_300
      : theme.COLORS.BLACK};
`
