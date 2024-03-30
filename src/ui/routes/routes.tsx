import React from 'react'
import { SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'

import { useAuth } from '@data/contexts/AuthContext'
import { DimensionContextProvider } from '@data/contexts/DimensionsContext'
import { SectionContextProvider } from '@data/contexts/SectionContext'

import { AuthRoutes } from './auth.routes'
import { HubDrawer } from './Drawer/Drawer'

export function Routes() {
  const { user, loadingUser } = useAuth()

  if (!loadingUser) {
    SplashScreen.hideAsync()
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <DimensionContextProvider>
          <SectionContextProvider>
            {user ? <HubDrawer /> : <AuthRoutes />}
          </SectionContextProvider>
        </DimensionContextProvider>
      </NavigationContainer>
    </SafeAreaView>
  )
}
