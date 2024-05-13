import notifee from '@notifee/react-native'

export async function cancelNotification(id: number) {
  await notifee.cancelNotification(id.toString())
}
