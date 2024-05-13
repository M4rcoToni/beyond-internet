import { PermissionsAndroid } from 'react-native'
import * as Device from 'expo-device'

export async function requestNotificationPermission() {
  const granted = await PermissionsAndroid.check(
    PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
  )

  if (granted) return

  const apiLevel = Number(Device.platformApiLevel)

  if (apiLevel <= 32) return

  const permission = PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS

  if (permission) {
    await PermissionsAndroid.request(permission)
  }
}
