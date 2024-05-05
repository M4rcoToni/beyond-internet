import React from 'react'
import {
  TestScreenOption,
  TestScreenOptionText,
} from '@components/QuestionButton/styles'

interface QuestionButtonProps {
  description: string
  onPress?: () => void
  isSelected?: boolean
  isCorrect: boolean
  isIncorrect: boolean
}

export function QuestionButton({
  description,
  onPress,
  isSelected,
  isCorrect,
  isIncorrect,
}: QuestionButtonProps) {
  return (
    <TestScreenOption
      selected={isSelected}
      isCorrect={isCorrect}
      isIncorrect={isIncorrect}
      onPress={onPress}
    >
      <TestScreenOptionText selected={isSelected}>
        {description}
      </TestScreenOptionText>
    </TestScreenOption>
  )
}
