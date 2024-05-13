import { INotificationsService } from '@data/interfaces/notifications'
import { requestNotificationPermission } from '@notifications/requestNotificationPermission'
import { scheduleNotification } from '@notifications/scheduleNotification'

export class NotificationsService implements INotificationsService {
  async requestNotificationPermission(): Promise<void> {
    await requestNotificationPermission()
  }

  async scheduleNotification(): Promise<void> {
    await scheduleNotification(
      'Continue seu streak!',
      'Complete um teste agora para manter seu streak de estudos.',
      1320, // 22 horas
    )

    await scheduleNotification(
      'Não perca seu streak!',
      'Fazer um teste agora ajudará a manter seu streak de estudos.',
      1380, // 23 horas
    )

    await scheduleNotification(
      'Seu streak está em risco!',
      'Complete um teste agora para não perder seu streak de estudos.',
      1430, // 23 horas e 50 minutos
    )
  }
}
