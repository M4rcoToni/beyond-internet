import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import theme from '@ui/theme'

interface ProgressBarProps {
  completedSections: number
  totalSections: number
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  completedSections,
  totalSections,
}) => {
  const completionPercentage = Math.abs(
    (completedSections / totalSections) * 100 - 100,
  )

  return (
    <View style={styles.container}>
      <View
        style={{ ...styles.progressBar, width: `${completionPercentage}%` }}
      />
      <Text style={styles.progressText}>{`${completionPercentage.toFixed(
        0,
      )}%`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 20,
    width: '100%',
    backgroundColor: theme.COLORS.GRAY_200,
    marginTop: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.COLORS.GREEN_500,
  },
  progressText: {
    position: 'absolute',
    alignSelf: 'center',
    top: 1,
    fontSize: 14,
  },
})
