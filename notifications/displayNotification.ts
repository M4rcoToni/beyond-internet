import notifee from '@notifee/react-native'
import { createChannelId } from './createChannelId'

export async function displayNotification(
  id: number,
  title: string,
  body: string,
) {
  await notifee.requestPermission()

  const channelId = await createChannelId()
  await notifee.displayNotification({
    id: id.toString(),
    title,
    body,
    android: { channelId },
  })
}
