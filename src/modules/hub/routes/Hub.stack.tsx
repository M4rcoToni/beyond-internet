import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Hub } from '../screens/Hub'

const { Navigator, Screen } = createNativeStackNavigator()

export function HubStack() {
  return (
    <Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Screen name="hub" component={Hub} />
    </Navigator>
  )
}
