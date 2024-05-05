import React from 'react'
import { TouchableOpacity } from 'react-native'
import { SectionDTO } from '@sqlite/modules/sections/interfaces/ISectionInterface'
import theme from '@ui/theme'
import { SubTitle } from '@ui/components'
import { SectionText } from '@components/DrawerContent/CourseContent/styles'

interface CourseItemProps {
  item: SectionDTO
  onPress?: () => void
  isSelected?: boolean
}

function CI({ item, onPress, isSelected }: CourseItemProps) {
  const testCompleted = item.tests?.completed === 1

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingLeft: 14,
        borderWidth: 1,
        borderColor: isSelected ? theme.COLORS.GREEN_700 : 'transparent',
        backgroundColor: testCompleted
          ? theme.COLORS.GRAY_100
          : theme.COLORS.WHITE,
        borderRadius: 8,
      }}
    >
      <SectionText isSelected={isSelected} isCompleted={testCompleted}>{`${
        item.title
      } ${testCompleted ? '✅' : ''}`}</SectionText>
    </TouchableOpacity>
  )
}

export const CourseItem = React.memo(CI)
