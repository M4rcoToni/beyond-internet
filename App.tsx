/* eslint-disable camelcase */
import { ActivityIndicator, StatusBar } from 'react-native'
import { ThemeProvider } from 'styled-components/native'
import {
  Poppins_400Regular,
  Poppins_700Bold,
  useFonts,
} from '@expo-google-fonts/poppins'
import React from 'react'
import 'react-native-gesture-handler'
import { Routes } from '@ui/routes'
import theme from '@ui/theme'
import { AuthContextProvider } from 'data/contexts/AuthContext'

import * as SplashScreen from 'expo-splash-screen'
import { initializeDatabase } from '@sqlite/initializeDatabase'

SplashScreen.preventAutoHideAsync()

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  })

  async function initializeApp() {
    try {
      await initializeDatabase()
    } catch (error) {
      console.error('Database initialization error: ', error)
    }
  }
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
