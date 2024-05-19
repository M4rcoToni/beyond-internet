import styled from 'styled-components/native'
import theme from '@ui/theme'

export const CardContainer = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  flex-direction: row;
  align-items: center;
  gap: 12px;
  padding: 16px;
  border-width: 1px;
  border-color: ${theme.COLORS.GRAY_200};
  border-radius: 8px;
`

export const Divider = styled.View`
  width: 1px;
  height: 100%;
  background-color: ${theme.COLORS.GRAY_200};
`

export const CompletionBadge = styled.View<{ hasCompletionDate: boolean }>`
  background-color: ${(props: { hasCompletionDate: boolean }) =>
    props.hasCompletionDate ? theme.COLORS.GREEN_700 : theme.COLORS.GRAY_200};
  border-radius: 50px;
  padding: 12px;
  margin-left: auto;
`

export const CourseName = styled.Text`
  font-weight: bold;
  font-size: 18px;
`
