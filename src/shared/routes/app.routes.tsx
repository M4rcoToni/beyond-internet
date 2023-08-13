import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { HubStack } from '../../modules/hub/routes/Hub.stack'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Screen name="hub" component={HubStack} />
    </Navigator>
  )
}
