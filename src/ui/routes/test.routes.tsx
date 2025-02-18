import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import { TestScreen } from '@screens/test/testScreen'

type CourseRoutes = {
  Hub: undefined
  Course: undefined
  Test: undefined
}

export type TestNavigatorRouterProps = NativeStackNavigationProp<CourseRoutes>

const { Navigator, Screen } = createNativeStackNavigator()

export function TestRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        animation: 'slide_from_right',
      }}
    >
      <Screen name="Test" component={TestScreen} />
    </Navigator>
  )
}
