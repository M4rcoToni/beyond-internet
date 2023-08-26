import HubDrawer from '@modules/hub/routes/Hub.drawer'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Screen name="hub" component={HubDrawer} />
    </Navigator>
  )
}
