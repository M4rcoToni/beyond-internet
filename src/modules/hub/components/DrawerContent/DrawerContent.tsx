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

interface DrawerContentProps {
  drawer: DrawerContentComponentProps
}

export function DrawerContent({ drawer }: DrawerContentProps) {
  const { user, signOut } = useAuth()
  const navigation = useNavigation()
  const { permission } = useStorage()
  const { handleSelectSection } = useSection()

  async function handleSessionPress() {
    await handleSelectSection(permission.index.sections[0])
    drawer.navigation.closeDrawer()
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {drawer.state.index === 0 ? (
        <HubContent signOut={signOut} user={user} />
      ) : (
        <CourseContent
          sections={permission.index.sections}
          courseName={permission.index.name}
          onPressBackButton={() => navigation.navigate('Hub')}
          onSessionPress={handleSessionPress}
        />
      )}
    </SafeAreaView>
  )
}
