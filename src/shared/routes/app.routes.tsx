import { Course } from '@modules/course/screens/Course'
import HubDrawer from '@modules/hub/routes/Hub.drawer'
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'

type AppRoutes = {
  Hub: undefined
  Course: undefined
}

export type AuthNavigatorRouterProps = NativeStackNavigationProp<AppRoutes>
const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
    >
      <Screen name="Hub" component={HubDrawer} />
      <Screen name="Course" component={Course} />
    </Navigator>
  )
}
