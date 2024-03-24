import { IAuthService } from '@data/interfaces/services/auth'
import { Result } from '@data/result'

import { db } from '@sqlite/index'
import { UserController } from '@sqlite/modules/users/controller'
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

    // const passwordHash = await Crypto.digestStringAsync(
    //   Crypto.CryptoDigestAlgorithm.SHA256,
    //   password,
    // )

    // if (user?.password !== passwordHash) {
    //   throw new Result(false, undefined, new Error('Senha inválida'))
    // }

    // await updateUserIsLoggedController(cpf, 1)

    return new Result(true, user)
  }
}
