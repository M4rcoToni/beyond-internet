/* eslint-disable camelcase */
import { ActivityIndicator, StatusBar, View } from 'react-native'
import { ThemeProvider } from 'styled-components/native'
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'
import React from 'react'
import 'react-native-gesture-handler'
import { Routes } from '@ui/routes'
import theme from '@ui/theme'
import { AuthContextProvider } from 'data/contexts/AuthContext'
import { initializeDatabase } from './sqlite/initializeDatabase'
import * as SplashScreen from 'expo-splash-screen'
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
      <StatusBar backgroundColor="transparent" translucent />
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </ThemeProvider>
  )
}
