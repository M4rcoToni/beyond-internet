import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import { HubDrawer } from './Drawer/Drawer'
import { CourseContextProvider } from '@data/contexts/CourseContext'

type AppRoutes = {
  Hub: undefined
  Course: undefined
}

export type AuthNavigatorRouterProps = NativeStackNavigationProp<AppRoutes>
const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <CourseContextProvider>
      <Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Screen name="Root" component={HubDrawer} />
      </Navigator>
    </CourseContextProvider>
  )
}
