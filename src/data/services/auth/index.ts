import { IAuthService } from '@data/interfaces/services/auth'
import { Result } from '@data/result'
import {
  getUserByCPFController,
  updateUserIsLoggedController,
} from '@sqlite/modules/users/controller/UserController'

import * as Crypto from 'expo-crypto'

export class AuthService implements IAuthService {
  async login(cpf: string, password: string) {
    const user = await getUserByCPFController(cpf)

    if (!user) {
      throw new Result(false, undefined, new Error('Usuário não encontrado'))
    }

    const passwordHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      password,
    )

    if (user?.password !== passwordHash) {
      throw new Result(false, undefined, new Error('Senha inválida'))
    }

    await updateUserIsLoggedController(cpf, 1)

    return new Result(true, user)
  }
}
