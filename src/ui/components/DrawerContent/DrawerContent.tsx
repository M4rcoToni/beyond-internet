import { SafeAreaView } from 'react-native'

import { DrawerNavigationHelpers } from '@react-navigation/drawer/lib/typescript/src/types'
import { useAuth } from '@data/contexts/AuthContext'
import { useStorage } from '@data/hooks/useStorage'
import { useNavigation } from '@react-navigation/native'
import { CourseContent } from '../CourseContent/CourseContent'
import { HubContent } from './HubContent/HubContent'

interface DrawerContentProps {
  drawer: DrawerNavigationHelpers
  screen: number
}

export function DrawerContent({ drawer, screen }: DrawerContentProps) {
  const { user } = useAuth()
  const navigation = useNavigation()
  const { course, index } = useStorage()

  function closeDrawer() {
    drawer.closeDrawer()
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* {screen === 0 ? ( */}
      <HubContent signOut={() => {}} user={user} />
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
