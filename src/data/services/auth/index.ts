import { IAuthService } from '@data/interfaces/auth'
import { Result } from '@data/result'

import { db } from '@sqlite/index'
import { UserController } from '@sqlite/modules/users/controller'
import { CreateUserDTO } from '@sqlite/modules/users/interfaces/IUserInterface'
import { UserRepository } from '@sqlite/modules/users/repository'
import { UserService } from '@sqlite/modules/users/service'

export class AuthService implements IAuthService {
  private userController = new UserController(
    new UserService(new UserRepository(db, 'users')),
  )

  async login(cpf: string, password: string) {
    const user = await this.userController.login(cpf, password)
    if (!user) {
      throw new Error()
    }

    return new Result(true, user)
  }

  async createUser(payload: CreateUserDTO) {
    const user = await this.userController.create(payload)

    return user
  }

  async hashPassword(password: string) {
    const passwordHash = await this.userController.hashPassword(password)

    return passwordHash
  }

  async first() {
    const user = await this.userController.first()

    return user
  }

  async update(id: number, data: Partial<CreateUserDTO>) {
    const user = await this.userController.update(id, data)

    return user
  }

  async updateStreak() {
    const userLogged = await this.userController.first()

    if (!userLogged) return null

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    let studyStreak = userLogged.studyStreak || 0
    const lastStudyDate = userLogged.lastStudyDate
      ? new Date(userLogged.lastStudyDate)
      : null

    if (lastStudyDate) {
      lastStudyDate.setHours(0, 0, 0, 0)
      const diffInDays = Math.round(
        (today.valueOf() - lastStudyDate.valueOf()) / (1000 * 60 * 60 * 24),
      )

      if (diffInDays === 1) {
        studyStreak += 1
      } else if (diffInDays > 1) {
        studyStreak = 1
      }
    } else {
      studyStreak = 1
    }
    console.log(today.toISOString(), studyStreak)

    const user = await this.userController?.update(userLogged?.id || 0, {
      studyStreak,
      lastStudyDate: today.toISOString(),
    })

    return user
  }
}
