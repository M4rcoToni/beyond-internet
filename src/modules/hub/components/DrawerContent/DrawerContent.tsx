import { SafeAreaView } from 'react-native'
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from '@react-navigation/drawer'
import { useAuth } from '@shared/hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import { HubContent } from './HubContent/HubContent'
import { useStorage } from '@shared/hooks/useStorage'
import { CourseContent } from '@modules/course/components/CourseContent/CourseContent'
import { useSection } from '@shared/hooks/useSection'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'

interface DrawerContentProps {
  drawer: DrawerNavigationHelpers
  screen: number
}

export function DrawerContent({ drawer, screen }: DrawerContentProps) {
  const { user, signOut } = useAuth()
  const navigation = useNavigation()
  const { permission } = useStorage()

  function closeDrawer() {
    drawer.closeDrawer()
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {screen === 0 ? (
        <HubContent signOut={signOut} user={user} />
      ) : (
        <CourseContent
          sections={permission.index.sections}
          courseName={permission.index.name}
          onPressBackButton={() => navigation.navigate('Hub')}
          closeDrawer={closeDrawer}
        />
      )}
    </SafeAreaView>
  )
}
