import React from 'react'
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { useTheme } from 'styled-components/native'

import { AuthRoutes } from './auth.routes'
import { useAuth } from '../hooks/useAuth'

export function Routes() {
  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer>
        <AuthRoutes />
      </NavigationContainer>
    </View>
  )
}
