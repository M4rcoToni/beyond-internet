/* eslint-disable camelcase */
import { ActivityIndicator, StatusBar, View } from 'react-native'
import { ThemeProvider } from 'styled-components/native'
import {
  useFonts,
  Poppins_400Regular,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins'
import React, { useEffect } from 'react'
import 'react-native-gesture-handler'
import theme from './src/shared/theme'
import { Routes } from '@shared/routes/routes'
import { initializeDatabase } from 'databases/modules/users/model/UserModel'
import { AuthContextProvider } from '@shared/contexts/AuthContext'

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
  })

  useEffect(() => {
    initializeDatabase()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <StatusBar backgroundColor="transparent" translucent />
      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <ActivityIndicator />}
      </AuthContextProvider>
    </ThemeProvider>
  )
}
