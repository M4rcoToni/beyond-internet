import React from 'react'
import { SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import { AuthRoutes } from './auth.routes'
import { useAuth } from '../hooks/useAuth'
import { AppRoutes } from './app.routes'
import { DimensionContextProvider } from '@shared/contexts/DimensionsContext'
import { StorageCourseContextProvider } from '@shared/contexts/StoragePermissionContext'

export function Routes() {
  const { user } = useAuth()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DimensionContextProvider>
        <StorageCourseContextProvider>
          <NavigationContainer>
            {user ? <AppRoutes /> : <AuthRoutes />}
          </NavigationContainer>
        </StorageCourseContextProvider>
      </DimensionContextProvider>
    </SafeAreaView>
  )
}
