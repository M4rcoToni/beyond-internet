import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { SubTitle } from '../SubTitle/SubTitle'
import { SectionDTO } from '@sqlite/modules/sections/interfaces/ISectionInterface'

interface CourseItemProps {
  item: SectionDTO
  onPress?: () => void
}

function CI({ item, onPress }: CourseItemProps) {
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
      }}
    >
      <SubTitle size={16} text={`${item.title}`} />
    </TouchableOpacity>
  )
}

export const CourseItem = React.memo(CI)
