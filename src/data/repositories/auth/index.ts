import { IAuthRepository } from '@data/interfaces/repositories/auth'
import { IAuthService } from '@data/interfaces/services/auth'
import { Result } from '@data/result'
import { UserDTO } from '@sqlite/modules/users/interfaces/IUserInterface'

export class AuthRepository implements IAuthRepository {
  // eslint-disable-next-line no-useless-constructor
  constructor(private readonly authService: IAuthService) {}
  async login(
    cpf: string,
    password: string,
  ): Promise<Result<UserDTO | null> | undefined> {
    try {
      return await this.authService.login(cpf, password)
    } catch (error) {
      throw new Result(false, undefined, new Error('Erro ao realizar login'))
    }
  }
}
