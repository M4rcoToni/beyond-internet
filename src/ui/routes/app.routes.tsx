import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack'
import { SectionContextProvider } from '../../data/contexts/SectionContext'
import { HubDrawer } from './Drawer/Drawer'

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
