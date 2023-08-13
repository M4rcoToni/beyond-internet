import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native'
import theme from '../theme'

export type ButtonTypeStyleProps = 'PRIMARY' | 'SECUNDARY'

type Props = {
  type: ButtonTypeStyleProps
}

export const ButtonStyled = styled(TouchableOpacity)<Props>`
  width: 100%;
  max-width: 60%;

  min-height: 56px;
  max-height: 56px;

  background-color: ${({ type }) =>
    type === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.RED_DARK};
  border-radius: 6px;
  justify-content: center;
  align-items: center;
`
