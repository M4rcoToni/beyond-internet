import React from 'react'
import { TestScreenNextButton, TestScreenNextButtonText } from './styles'
import { ActivityIndicator } from 'react-native'
import theme from '@ui/theme'

interface TestNextButtonProps {
  onVerifyOption: () => void
  onGoToNextQuestion: () => void
  onFinished: () => void
  disabled: boolean
  isCorrect: boolean
  isSelected: boolean
  isFinished: boolean
  isLoading?: boolean
}

export function TestNextButton({
  onVerifyOption,
  onGoToNextQuestion,
  onFinished,
  isFinished,
  disabled,
  isSelected,
  isCorrect,
  isLoading,
}: TestNextButtonProps) {
  if (isCorrect && isFinished) {
    return (
      <TestScreenNextButton
        onPress={onFinished}
        disabled={disabled}
        isSelected={true}
        isCorrect={true}
      >
        {isLoading ? (
          <ActivityIndicator color={theme.COLORS.WHITE} />
        ) : (
          <TestScreenNextButtonText>Finalizar teste</TestScreenNextButtonText>
        )}
      </TestScreenNextButton>
    )
  }

  return (
    <TestScreenNextButton
      onPress={isCorrect ? onGoToNextQuestion : onVerifyOption}
      disabled={disabled}
      isSelected={isSelected}
      isCorrect={isCorrect}
    >
      <TestScreenNextButtonText>
        {isCorrect ? 'Próxima questão' : 'Verificar resposta'}
      </TestScreenNextButtonText>
    </TestScreenNextButton>
  )
}
