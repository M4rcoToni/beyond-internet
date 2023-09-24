import { createDrawerNavigator } from '@react-navigation/drawer'
import { Hub } from '../screens/Hub'
import { View, useWindowDimensions } from 'react-native'
import { SubTitle } from '@shared/components'
import { DrawerContent } from '../components/DrawerContent/DrawerContent'

const Drawer = createDrawerNavigator()

export default function HubDrawer() {
  const dimensions = useWindowDimensions()
  const isLargeScreen = dimensions.width >= 768
  return (
    <Drawer.Navigator
      drawerContent={(item) => <DrawerContent item={item} />}
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
    </Drawer.Navigator>
  )
}
