import React from 'react'
import { Container, Progress, ProgressText } from './styles'

interface ProgressBarProps {
  completionPercentage: number
}

const ProgressBar = React.memo(({ completionPercentage }: ProgressBarProps) => {
  return (
    <Container>
      <Progress width={completionPercentage} />
      <ProgressText>{`${completionPercentage.toFixed(0)}%`}</ProgressText>
    </Container>
  )
})

ProgressBar.displayName = 'ProgressBar'

export { ProgressBar }
