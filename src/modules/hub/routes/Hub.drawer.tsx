import { createDrawerNavigator } from '@react-navigation/drawer'
import { Hub } from '../screens/Hub'
import { View, useWindowDimensions } from 'react-native'
import { SubTitle } from '@shared/components'

const Drawer = createDrawerNavigator()

export default function HubDrawer() {
  const dimensions = useWindowDimensions()
  const isLargeScreen = dimensions.width >= 768
  return (
    <Drawer.Navigator
      drawerContent={(item) => {
        return (
          <View>
            <SubTitle>Drawer{item.state.routeNames}</SubTitle>
          </View>
        )
      }}
      screenOptions={{
        drawerType: isLargeScreen ? 'permanent' : 'front',
        drawerStyle: isLargeScreen ? { width: '25%' } : { width: '90%' },
        overlayColor: '#0000002b',
        headerRight: () => (
          <>
            <View style={{ width: 100, height: 20 }}>
              <SubTitle>6 dias</SubTitle>
            </View>
          </>
        ),
      }}
    >
      <Drawer.Screen
        name="Hub"
        options={{
          headerShown: true,
        }}
        component={Hub}
      />
    </Drawer.Navigator>
  )
}
