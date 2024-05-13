import notifee, { AndroidImportance, TriggerType } from '@notifee/react-native'
import { createChannelId } from './createChannelId'

export async function scheduleNotification(
  title: string,
  body: string,
  min: number,
) {
  const channelId = await createChannelId()

  await notifee.createTriggerNotification(
    {
      title,
      body,
      android: {
        channelId,
        importance: AndroidImportance.HIGH,
      },
    },
    {
      type: TriggerType.TIMESTAMP,
      timestamp: Date.now() + min * 60 * 1000,
    },
  )
}
