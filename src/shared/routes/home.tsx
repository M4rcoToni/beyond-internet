import React from 'react'
import { SafeAreaView, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { useTheme } from 'styled-components/native'

import { AuthRoutes } from './auth.routes'
import { useAuth } from '../hooks/useAuth'
import { AppRoutes } from './app.routes'
import HubDrawer from '@modules/hub/routes/Hub.drawer'
import { AuthContextProvider } from '@shared/contexts/AuthContext'
import { DimensionContextProvider } from '@shared/contexts/DimensionsContext'

export function Routes() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <AuthContextProvider>
        <DimensionContextProvider>
          <NavigationContainer>
            {/* {
            user ? 
            {/* } */}
            <AppRoutes />
          </NavigationContainer>
        </DimensionContextProvider>
      </AuthContextProvider>
    </SafeAreaView>
  )
}
