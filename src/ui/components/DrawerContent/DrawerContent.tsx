import { SafeAreaView } from 'react-native'

import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import { useAuth } from '@data/contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { CourseContent } from '../CourseContent/CourseContent'
import { HubContent } from './HubContent/HubContent'
import { useDrawerContentViewModel } from './useDrawerContentViewModel'
import { AuthRepository } from '@data/repositories/auth'
import { AuthService } from '@data/services/auth'
import { useStorage } from '@data/contexts/StoragePermissionContext'

interface DrawerContentProps {
  drawer: DrawerNavigationHelpers
  screen: number
}

export function DrawerContent({ drawer, screen }: DrawerContentProps) {
  const { user, handleLogout } = useDrawerContentViewModel(
    new AuthRepository(new AuthService()),
  )
  const navigation = useNavigation()
  const { course, index } = useStorage()

  function closeDrawer() {
    drawer.closeDrawer()
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* {screen === 0 ? ( */}
      <HubContent signOut={handleLogout} user={user} />
      {/* // ) : (
      //   <CourseContent
      //     sections={course[index].index.sections}
      //     courseName={course[index].index.name}
      //     onPressBackButton={() => navigation.navigate('Hub')}
      //     closeDrawer={closeDrawer}
      //   />
      // )} */}
    </SafeAreaView>
  )
}
