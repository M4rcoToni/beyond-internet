import styled, { css } from 'styled-components/native'

interface TestScreenOptionProps {
  selected: boolean
  isCorrect?: boolean
  isIncorrect?: boolean
}
// ${props =>
//   props?.isTextArea
//     ? css`
//         height: 100px;
//         align-items: flex-start;
//       `
//     : css`
//         height: 44px;
//         align-items: center;
//       `}
export const TestScreenOption = styled.TouchableOpacity<TestScreenOptionProps>`
  padding: 15px;
  margin: 5px;
  border-radius: 5px;

  ${({ selected, isCorrect, isIncorrect }: TestScreenOptionProps) =>
    (selected &&
      isCorrect &&
      css`
        border-width: 2px;
        border-color: #00ff00;
        background-color: rgba(0, 255, 0, 0.12);
      `) ||
    (selected &&
      isIncorrect &&
      css`
        border-width: 2px;
        border-color: #ff0000;
        background-color: rgba(255, 0, 0, 0.13);
      `) ||
    (selected &&
      css`
        border-width: 2px;
        border-color: #49d2f4;
        background-color: rgba(118, 227, 255, 0.12);
      `) ||
    css`
      border-width: 1px;
      border-color: black;
      background-color: white;
    `}
`

export const TestScreenOptionText = styled.Text<TestScreenOptionProps>`
  font-size: 16px;
  color: black;
  text-align: center;
  font-weight: ${({ selected }: TestScreenOptionProps) =>
    selected ? '700' : '500'};
`
