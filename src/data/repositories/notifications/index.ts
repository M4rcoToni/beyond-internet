import { Result } from '@data/result'
import {
  INotificationsRepository,
  INotificationsService,
} from '@data/interfaces/notifications'

export class NotificationsRepository implements INotificationsRepository {
  constructor(private readonly notificationsService: INotificationsService) {}

  async requestNotificationPermission(): Promise<void> {
    try {
      return await this.notificationsService.requestNotificationPermission()
    } catch (error) {
      throw new Result(
        false,
        undefined,
        new Error(
          error instanceof Result
            ? error.getError()?.message
            : 'Erro ao solicitar permissão de notificação',
        ),
      )
    }
  }

  async scheduleNotification(): Promise<void> {
    try {
      return await this.notificationsService.scheduleNotification()
    } catch (error) {
      throw new Result(
        false,
        undefined,
        new Error(
          error instanceof Result
            ? error.getError()?.message
            : 'Erro ao agendar notificação',
        ),
      )
    }
  }
}
