import { SubTitle } from '@ui/components'
import { Course } from '@ui/screens/course/Course'
import { Hub } from '@ui/screens/hub/Hub'
import React from 'react'
import { View, useWindowDimensions } from 'react-native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import { DrawerContent } from '@ui/components/DrawerContent/DrawerContent'
import { useDrawerViewModel } from './useDrawerViewModel'
import { CoursesRepository } from '@data/repositories/course'
import { CoursesService } from '@data/services/course'

const Drawer = createDrawerNavigator()
const MemoizedCourse = React.memo(Course)
const MemoizedDrawer = React.memo(DrawerContent)

export function HubDrawer() {
  const dimensions = useWindowDimensions()
  const isLargeScreen = dimensions.width >= 768

  const { index, sections } = useDrawerViewModel(
    new CoursesRepository(new CoursesService()),
  )
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

        headerRight: () => (
          <>
            <View style={{ width: 100, height: 20 }}>
              <SubTitle text="6 dias" />
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
        }}
        component={Hub}
      />

      <Drawer.Screen
        name="Course"
        options={() => ({
          headerShown: true,
          headerTitle: index && sections ? sections[index].title : 'Aulas',
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          gestureResponseDistance: {
            horizontal: 100,
          },
          shouldPreventDefaultGesture: true,
        })}
        component={MemoizedCourse}
      />
    </Drawer.Navigator>
  )
}
