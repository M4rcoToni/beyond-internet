import { INotificationsService } from '@data/interfaces/notifications'
import { requestNotificationPermission } from '@notifications/requestNotificationPermission'
import { scheduleNotification } from '@notifications/scheduleNotification'

export class NotificationsService implements INotificationsService {
  async requestNotificationPermission(): Promise<void> {
    await requestNotificationPermission()
  }

  async scheduleNotification(): Promise<void> {
    await scheduleNotification(
      'Continue sua sequência!',
      'Complete um teste agora para manter sua sequência de estudos.',
      1320, // 22 horas
    )

    await scheduleNotification(
      'Não perca seus livrinhos!',
      'Fazer um teste agora ajudará a manter sua consistência nos estudos.',
      1380, // 23 horas
    )

    await scheduleNotification(
      'Sua sequência está em risco!',
      'Complete um teste agora para não perder seus livrinhos e seu conhecimento.',
      1430, // 23 horas e 50 minutos
    )
  }
}
