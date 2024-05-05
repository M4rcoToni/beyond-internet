import React from 'react'
import { TouchableOpacity } from 'react-native'
import { SectionDTO } from '@sqlite/modules/sections/interfaces/ISectionInterface'
import theme from '@ui/theme'
import { SubTitle } from '@ui/components'

interface CourseItemProps {
  item: SectionDTO
  onPress?: () => void
  isSelected?: boolean
}

function CI({ item, onPress, isSelected }: CourseItemProps) {
  return (
    <TouchableOpacity
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
        borderRadius: 8,
      }}
    >
      <SubTitle size={16} text={`${item.title}`} />
    </TouchableOpacity>
  )
}

export const CourseItem = React.memo(CI)
