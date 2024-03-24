import React from 'react'
import { SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { DimensionContextProvider } from 'data/contexts/DimensionsContext'
import { StorageCourseContextProvider } from 'data/contexts/StoragePermissionContext'
import HubDrawer from './Hub.drawer'
import { AuthRoutes } from './auth.routes'
import { SectionContextProvider } from '../../data/contexts/SectionContext'
import { useAuth } from '@data/contexts/AuthContext'

export function Routes() {
  const { user } = useAuth()

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NavigationContainer>
        <DimensionContextProvider>
          <SectionContextProvider>
            <StorageCourseContextProvider>
              {user ? <HubDrawer /> : <AuthRoutes />}
            </StorageCourseContextProvider>
          </SectionContextProvider>
        </DimensionContextProvider>
      </NavigationContainer>
    </SafeAreaView>
  )
}
