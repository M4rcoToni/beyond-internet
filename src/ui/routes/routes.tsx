import React from 'react'
import { SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import * as SplashScreen from 'expo-splash-screen'

import { useAuth } from '@data/contexts/AuthContext'
import { DimensionContextProvider } from '@data/contexts/DimensionsContext'

import { AuthRoutes } from './auth.routes'
import { CourseContextProvider } from '@data/contexts/CourseContext'
import { AppRoutes } from '@routes/app.routes'

export function Routes() {
  const { user, loadingUser } = useAuth()

  if (!loadingUser) {
    SplashScreen.hideAsync()
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <DimensionContextProvider>
          <CourseContextProvider>
            {user ? <AppRoutes /> : <AuthRoutes />}
          </CourseContextProvider>
        </DimensionContextProvider>
      </NavigationContainer>
    </SafeAreaView>
  )
}
