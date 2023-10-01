import { createDrawerNavigator } from '@react-navigation/drawer'
import { View, useWindowDimensions } from 'react-native'
import { SubTitle } from '@shared/components'
import { DrawerContent } from '../components/DrawerContent/DrawerContent'
import { Hub } from '../screens/Hub'
import { Course } from '@modules/course/screens/Course'
import { useStorage } from '@shared/hooks/useStorage'
import React from 'react'
import { LoadingScreen } from '@modules/course/screens/LoadingScreen'

const Drawer = createDrawerNavigator()
const MemoizedCourse = React.memo(Course)
const MemoizedDrawer = React.memo(DrawerContent)

export default function HubDrawer() {
  const dimensions = useWindowDimensions()
  const isLargeScreen = dimensions.width >= 768

  const { permission } = useStorage()
  return (
    <Drawer.Navigator
      drawerContent={(item) => (
        <MemoizedDrawer drawer={item.navigation} screen={item.state.index} />
      )}
      screenOptions={{
        drawerType: isLargeScreen ? 'permanent' : 'front',
        drawerStyle: isLargeScreen ? { width: '25%' } : { width: '90%' },
        overlayColor: '#0000002b',
        // drawerPosition: 'right',
        headerRight: () => (
          <>
            <View style={{ width: 100, height: 20 }}>
              <SubTitle text="6 dias" />
            </View>
          </>
        ),
      }}
    >
      <Drawer.Screen
        name="Hub"
        options={{
          headerShown: true,
          headerTitle: 'Cursos',
        }}
        component={Hub}
      />

      <Drawer.Screen
        name="Course"
        options={() => ({
          headerShown: true,
          headerTitle: permission.index?.name ? permission.index.name : 'Aulas',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          gestureResponseDistance: {
            horizontal: 100,
          },
          shouldPreventDefaultGesture: true, // Impede que o usuário abra o drawer durante a renderização
        })}
        component={MemoizedCourse}
      />

      <Drawer.Screen
        name="LoadingScreen"
        options={{
          headerShown: false,
        }}
        component={LoadingScreen}
      />
    </Drawer.Navigator>
  )
}
