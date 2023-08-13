import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SignIn } from '../screens/SignIn'

const { Navigator, Screen } = createNativeStackNavigator()

export function HubStack() {
  return (
    <Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Screen name="signIn" component={SignIn} />
    </Navigator>
  )
}
