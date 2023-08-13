import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { useTheme } from 'styled-components/native'

import { AppRoutes } from './app.routes'
import { useAuth } from '../hooks/useAuth'

import { AuthRoutes } from './auth.routes'

export function Routes() {
  const { COLORS } = useTheme()
  const { user } = useAuth()

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <AuthRoutes />
      </NavigationContainer>
    </View>
  )
}
