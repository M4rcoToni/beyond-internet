import { SafeAreaView } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'

import { CourseContent } from './CourseContent/CourseContent'
import { useDrawerContentViewModel } from './useDrawerContentViewModel'

import { AuthRepository } from '@data/repositories/auth'
import { AuthService } from '@data/services/auth'
import { CoursesRepository } from '@data/repositories/course'
import { CoursesService } from '@data/services/course'
import { HubContent } from '@components/DrawerContent/HubContent/HubContent'

interface DrawerContentProps {
  drawer: DrawerNavigationHelpers
  screen: number
}

export function DrawerContent({ drawer, screen }: DrawerContentProps) {
  const { user, handleLogout, course, sections, handleBackToHub } =
    useDrawerContentViewModel(
      new AuthRepository(new AuthService()),
      new CoursesRepository(new CoursesService()),
    )

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {screen === 0 ? (
        <HubContent signOut={handleLogout} user={user} />
      ) : (
        <CourseContent
          sections={sections}
          courseName={course?.indexFile.name || ''}
          onPressBackButton={handleBackToHub}
          closeDrawer={() => drawer.closeDrawer()}
        />
      )}
    </SafeAreaView>
  )
}
