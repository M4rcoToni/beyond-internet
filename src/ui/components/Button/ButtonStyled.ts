import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native'
import theme from '@ui/theme'

export type ButtonTypeStyleProps = 'PRIMARY' | 'SECUNDARY'

type Props = {
  type: ButtonTypeStyleProps
}

export const ButtonStyled = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})<Props>`
  width: 100%;
  max-width: 200px;

  max-height: 56px;

  background-color: ${({ type }: Props) =>
    type === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.GRAY_300};
  border-radius: 6px;
  justify-content: center;
  align-items: center;
`
