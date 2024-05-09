import React from 'react'
import { View, useWindowDimensions } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { useDrawerViewModel } from './useDrawerViewModel'
import { Course, Hub } from '@ui/screens'
import { DrawerContent } from '@components/DrawerContent/DrawerContent'
import { SubTitle } from '@ui/components'

const Drawer = createDrawerNavigator()
const MemoizedDrawer = React.memo(DrawerContent)

export function HubDrawer() {
  const dimensions = useWindowDimensions()
  const isLargeScreen = dimensions.width >= 768

  const { index, sections, user } = useDrawerViewModel()
  return (
    <Drawer.Navigator
      drawerContent={(item) => (
        <MemoizedDrawer drawer={item.navigation} screen={item.state.index} />
      )}
      screenOptions={{
        drawerType: isLargeScreen ? 'permanent' : 'front',
        drawerStyle: isLargeScreen ? { width: '25%' } : { width: '90%' },
        overlayColor: '#0000002b',
        drawerStatusBarAnimation: 'slide',
        freezeOnBlur: true,
        swipeMinDistance: 60,
        headerRight: () => (
          <>
            <View style={{ width: 100, height: 20 }}>
              <SubTitle text={`${user?.studyStreak || 0} dias 📚`} />
            </View>
          </>
        ),
        headerLeft: () => null,
      }}
    >
      <Drawer.Screen
        name="Hub"
        options={{
          headerShown: true,
          headerTitle: 'Cursos',
          drawerType: 'slide',
        }}
        component={Hub}
      />

      <Drawer.Screen
        name="Course"
        options={() => ({
          headerShown: false,
          headerTitle: index && sections ? sections[index]?.title : 'Aulas',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          gestureResponseDistance: {
            horizontal: 100,
          },
          drawerType: 'slide',
          shouldPreventDefaultGesture: true,
        })}
        component={Course}
      />
    </Drawer.Navigator>
  )
}
