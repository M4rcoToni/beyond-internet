import notifee, { AndroidImportance } from '@notifee/react-native'

export async function createChannelId() {
  const channelId = await notifee.createChannel({
    id: 'beyond',
    name: 'scheduled-notification',
    vibration: true,
    importance: AndroidImportance.HIGH,
  })

  return channelId
}
