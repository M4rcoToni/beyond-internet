import { FlatList, RefreshControl, StyleProp, ViewStyle } from 'react-native'
import { ClassCard } from '../ClassCard/ClassCard'
import { Permissions } from '../../../../databases/modules/permissions/model/Permissions'

import { ClassEmpty } from './ClassEmpty/ClassEmpty'
import { useNavigation } from '@react-navigation/native'

interface ClassListProps {
  data: Permissions[]
  refreshing: boolean
  onRefresh: () => void
  getCourse?: () => void
  style?: StyleProp<ViewStyle>
}

export function ClassList({
  data,
  onRefresh,
  refreshing,
  getCourse,
  ...rest
}: ClassListProps) {
  const { navigate } = useNavigation()
  return (
    <FlatList
      {...rest}
      data={data}
      horizontal
      shouldRasterizeIOS
      renderToHardwareTextureAndroid
      refreshing={refreshing}
      keyExtractor={(item) => item.courseId.toString()}
      renderItem={({ item }) => (
        <ClassCard
          title={item.directoryName}
          subTitle={`${item.id} aulas`}
          image={item.files[4]}
          onPress={() => {
            navigate('Class', { item })
          }}
        />
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListEmptyComponent={() => <ClassEmpty getCourse={getCourse} />}
    />
  )
}
