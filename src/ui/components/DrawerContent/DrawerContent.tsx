import { SafeAreaView } from 'react-native'

import { useAuth } from '@shared/hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { HubContent } from './HubContent/HubContent'
import { useStorage } from '@shared/hooks/useStorage'
import { CourseContent } from '@modules/course/components/CourseContent/CourseContent'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'

interface DrawerContentProps {
  drawer: DrawerNavigationHelpers
  screen: number
}

export function DrawerContent({ drawer, screen }: DrawerContentProps) {
  const { user, signOut } = useAuth()
  const navigation = useNavigation()
  const { course, index } = useStorage()

  function closeDrawer() {
    drawer.closeDrawer()
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {screen === 0 ? (
        <HubContent signOut={signOut} user={user} />
      ) : (
        <CourseContent
          sections={course[index].index.sections}
          courseName={course[index].index.name}
          onPressBackButton={() => navigation.navigate('Hub')}
          closeDrawer={closeDrawer}
        />
      )}
    </SafeAreaView>
  )
}
