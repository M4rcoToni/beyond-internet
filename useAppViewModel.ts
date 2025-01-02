import { useCallback } from 'react'
import { NotificationsRepository } from '@data/repositories/notifications'

export const useAppViewModel = (
  notificationsService: NotificationsRepository,
) => {
  const requestNotificationPermission = useCallback(async () => {
    try {
      await notificationsService.requestNotificationPermission()
    } catch (error) {
      console.error('Error requesting notification permission: ', error)
    }
  }, [notificationsService])

  return { requestNotificationPermission }
}

