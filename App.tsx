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
import theme from './src/shared/theme'
import { Routes } from '@shared/routes/routes'

import { AuthContextProvider } from '@shared/contexts/AuthContext'
import { initializeDatabase } from 'databases/initializeDatabase'

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  })

  async function initializeApp() {
    try {
      const init = await initializeDatabase()
      console.log(init)
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
        backgroundColor="transparent"
        // translucent
      />
      <AuthContextProvider>
        <Routes />
      </AuthContextProvider>
    </ThemeProvider>
  )
}
