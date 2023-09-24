import styled from 'styled-components/native'
import { TouchableOpacity } from 'react-native'
import theme from '@shared/theme'

export type ButtonTypeStyleProps = 'PRIMARY' | 'SECUNDARY'

type Props = {
  type: ButtonTypeStyleProps
}

export const ButtonStyled = styled(TouchableOpacity)<Props>`
  width: 100%;
  max-width: 400px;

  max-height: 56px;

  background-color: ${({ type }: Props) =>
    type === 'PRIMARY' ? theme.COLORS.GREEN_700 : theme.COLORS.GRAY_300};
  border-radius: 6px;
  justify-content: center;
  align-items: center;
`
