export interface INotificationsRepository {
  requestNotificationPermission: () => Promise<void>
  scheduleNotification: () => Promise<void>
}

export interface INotificationsService {
  requestNotificationPermission: () => Promise<void>
  scheduleNotification: () => Promise<void>
}
