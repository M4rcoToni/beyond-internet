import { IAuthRepository } from '@data/interfaces/repositories/auth'
import { IAuthService } from '@data/interfaces/services/auth'
import { Result } from '@data/result'
import {
  CreateUserDTO,
  UserDTO,
} from '@sqlite/modules/users/interfaces/IUserInterface'

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

  async createUser(payload: CreateUserDTO): Promise<UserDTO | null> {
    try {
      return await this.authService.createUser(payload)
    } catch (error) {
      throw new Result(false, undefined, new Error('Erro ao criar usuário'))
    }
  }

  async hashPassword(password: string): Promise<string> {
    try {
      return await this.authService.hashPassword(password)
    } catch (error) {
      throw new Result(false, undefined, new Error('Erro ao criar hash'))
    }
  }
}
