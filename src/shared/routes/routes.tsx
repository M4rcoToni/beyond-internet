import React from 'react'
import { SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import { AuthRoutes } from './auth.routes'
import { useAuth } from '../hooks/useAuth'
import { AppRoutes } from './app.routes'
import { DimensionContextProvider } from '@shared/contexts/DimensionsContext'

export function Routes() {
  const { user } = useAuth()
  console.log(user, 'user routes')

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DimensionContextProvider>
        <NavigationContainer>
          {user ? <AppRoutes /> : <AuthRoutes />}
        </NavigationContainer>
      </DimensionContextProvider>
    </SafeAreaView>
  )
}
