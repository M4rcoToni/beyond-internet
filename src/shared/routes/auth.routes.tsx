import { SignIn } from '@modules/signin/screens/SignIn'
import { SignUp } from '@modules/signup/screens/SignUp'
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack'

type AuthRoutes = {
  signIn: undefined
  SignUp: undefined
}

export type AuthNavigatorRouterProps = NativeStackNavigationProp<AuthRoutes>

const { Navigator, Screen } = createNativeStackNavigator<AuthRoutes>()

export function AuthRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Screen name="signIn" component={SignIn} />
      <Screen name="signUp" component={SignUp} />
    </Navigator>
  )
}
