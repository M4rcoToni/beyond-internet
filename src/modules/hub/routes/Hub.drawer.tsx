import { createDrawerNavigator } from '@react-navigation/drawer'
import { View, useWindowDimensions } from 'react-native'
import { SubTitle } from '@shared/components'
import { DrawerContent } from '../components/DrawerContent/DrawerContent'
import { Hub } from '../screens/Hub'
import { Course } from '@modules/course/screens/Course'
import { useStorage } from '@shared/hooks/useStorage'

const Drawer = createDrawerNavigator()

export default function HubDrawer() {
  const dimensions = useWindowDimensions()
  const isLargeScreen = dimensions.width >= 768

  const { permission } = useStorage()
  return (
    <Drawer.Navigator
      drawerContent={(item) => <DrawerContent drawer={item} />}
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
        options={{
          headerShown: true,
          headerTitle: permission.index?.name ? permission.index.name : 'Aulas',
        }}
        component={Course}
      />
    </Drawer.Navigator>
  )
}
