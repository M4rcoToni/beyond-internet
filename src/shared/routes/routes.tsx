import React from 'react'
import { SafeAreaView } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'

import { AuthRoutes } from './auth.routes'
import { useAuth } from '../hooks/useAuth'
import { DimensionContextProvider } from '@shared/contexts/DimensionsContext'
import { StorageCourseContextProvider } from '@shared/contexts/StoragePermissionContext'
import HubDrawer from '@modules/hub/routes/Hub.drawer'
import { SectionContextProvider } from '@shared/contexts/CourseContext'

export function Routes() {
  const { user } = useAuth()
  console.log(user, 'user')

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <DimensionContextProvider>
        <StorageCourseContextProvider>
          <SectionContextProvider>
            <NavigationContainer>
              {user ? <HubDrawer /> : <AuthRoutes />}
            </NavigationContainer>
          </SectionContextProvider>
        </StorageCourseContextProvider>
      </DimensionContextProvider>
    </SafeAreaView>
  )
}
