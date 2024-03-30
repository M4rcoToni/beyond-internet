import { SafeAreaView } from 'react-native'

import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import { useAuth } from '@data/contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { CourseContent } from '../CourseContent/CourseContent'
import { HubContent } from './HubContent/HubContent'
import { useDrawerContentViewModel } from './useDrawerContentViewModel'
import { AuthRepository } from '@data/repositories/auth'
import { AuthService } from '@data/services/auth'
import { CoursesRepository } from '@data/repositories/course'
import { CoursesService } from '@data/services/course'

interface DrawerContentProps {
  drawer: DrawerNavigationHelpers
  screen: number
}

export function DrawerContent({ drawer, screen }: DrawerContentProps) {
  const { user, handleLogout } = useDrawerContentViewModel(
    new AuthRepository(new AuthService()),
    new CoursesRepository(new CoursesService()),
  )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {screen === 0 ? (
        <HubContent signOut={handleLogout} user={user} />
      ) : (
        // TODO: Fix this with provider
        // <CourseContent
        //   sections={course[index].index.sections}
        //   courseName={course[index].index.name}
        //   onPressBackButton={() => navigation.navigate('Hub')}
        //   closeDrawer={closeDrawer}
        // />
        <></>
      )}
    </SafeAreaView>
  )
}
