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
      screenOptions={{
        drawerType: isLargeScreen ? 'permanent' : 'front',
        drawerStyle: isLargeScreen ? { width: '25%' } : { width: '100%' },
        overlayColor: 'transparent',
        headerRight: () => (
          <>
            <View style={{ width: 100, height: 20 }}>
              <SubTitle>6 dias</SubTitle>
            </View>
          </>
        ),
      }}
    >
      <Drawer.Screen name="Hub" component={Hub} />
    </Drawer.Navigator>
  )
}
