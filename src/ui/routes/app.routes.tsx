import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import { HubDrawer } from './Drawer/Drawer'
import { CourseContextProvider } from '@data/contexts/CourseContext'
import { TestRoutes } from '@routes/test.routes'
import { Certificate } from '@ui/screens'

type AppRoutes = {
  Hub: undefined
  Course: undefined
  Test: undefined
}

export type AuthNavigatorRouterProps = NativeStackNavigationProp<AppRoutes>

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <CourseContextProvider>
      <Navigator
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      >
        <Screen name="Root" component={HubDrawer} />
        <Screen name="TestRoutes" component={TestRoutes} />
        <Screen
          name="Certificate"
          component={Certificate}
          options={{
            title: 'Certificados',
            headerShown: true,
          }}
        />
      </Navigator>
    </CourseContextProvider>
  )
}
