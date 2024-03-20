import { Course } from '@modules/course/screens/Course'
import HubDrawer from '@modules/hub/routes/Hub.drawer'
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import { SectionContextProvider } from '@shared/contexts/CourseContext'

type AppRoutes = {
  Hub: undefined
  Course: undefined
}

export type AuthNavigatorRouterProps = NativeStackNavigationProp<AppRoutes>
const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <SectionContextProvider>
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen name="Root" component={HubDrawer} />
      </Navigator>
    </SectionContextProvider>
  )
}
