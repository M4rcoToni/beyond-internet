import { IAuthService } from '@data/interfaces/services/auth'
import { Result } from '@data/result'

import { db } from '@sqlite/index'
import { UserController } from '@sqlite/modules/users/controller'
import { CreateUserDTO } from '@sqlite/modules/users/interfaces/IUserInterface'
import { UserRepository } from '@sqlite/modules/users/repository'
import { UserService } from '@sqlite/modules/users/service'

export class AuthService implements IAuthService {
  async login(cpf: string, password: string) {
    const userService = new UserController(
      new UserService(new UserRepository(db, 'users')),
    )

    const user = await userService.findByField('cpf', cpf)
    if (!user) {
      throw new Error()
    }

    return new Result(true, user)
  }

  async createUser(payload: CreateUserDTO) {
    const userService = new UserController(
      new UserService(new UserRepository(db, 'users')),
    )

    const user = await userService.createUser(payload)

    return user
  }

  async hashPassword(password: string) {
    const userService = new UserController(
      new UserService(new UserRepository(db, 'users')),
    )

    const passwordHash = await userService.hashPassword(password)

    return passwordHash
  }
}
