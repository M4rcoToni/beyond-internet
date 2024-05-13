/* eslint-disable camelcase */
import { ActivityIndicator, StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components/native'
import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins'
import React, { useEffect } from 'react'
import 'react-native-gesture-handler'
import { Routes } from '@ui/routes'
import theme from '@ui/theme'
import { AuthContextProvider } from 'data/contexts/AuthContext'

import * as SplashScreen from 'expo-splash-screen'
import { initializeDatabase } from '@sqlite/initializeDatabase'
import { useAppViewModel } from './useAppViewModel'
import { NotificationsRepository } from '@data/repositories/notifications'
import { NotificationsService } from '@data/services/notifications'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  })
  const { requestNotificationPermission } = useAppViewModel(
    new NotificationsRepository(new NotificationsService()),
  )

  async function initializeApp() {
    try {
      await initializeDatabase()
    } catch (error) {
      console.error('Database initialization error: ', error)
    }
  }

  useEffect(() => {
    async function requestPermission() {
      await requestNotificationPermission()
    }
    requestPermission()
  }, [requestNotificationPermission])

  if (!fontsLoaded) {
    return <ActivityIndicator />
  }

  initializeApp()

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor={theme.COLORS.GRAY_700}
      />
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </ThemeProvider>
  )
}
