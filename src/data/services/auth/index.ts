import { IAuthService } from '@data/interfaces/auth'
import { Result } from '@data/result'

import { db } from '@sqlite/index'
import { CreateUserDTO } from '@sqlite/modules/users/interfaces/IUserInterface'
import { UserRepository } from '@sqlite/modules/users/repository'
import { UserService } from '@sqlite/modules/users/service'

export class AuthService implements IAuthService {
  private userService = new UserService(new UserRepository(db, 'users'))

  async login(cpf: string, password: string) {
    const user = await this.userService.login(cpf, password)
    if (!user) {
      throw new Error()
    }

    return new Result(true, user)
  }

  async createUser(payload: CreateUserDTO) {
    const user = await this.userService.create(payload)

    return user
  }

  async hashPassword(password: string) {
    const passwordHash = await this.userService.hashPassword(password)

    return passwordHash
  }

  async first() {
    const user = await this.userService.first()

    return user
  }

  async update(id: number, data: Partial<CreateUserDTO>) {
    const user = await this.userService.update(id, data)

    return user
  }
}
