import {
  CreateUserDTO,
  UserDTO,
} from '@sqlite/modules/users/interfaces/IUserInterface'
import { Result } from '../../../result/index'

export interface IAuthRepository {
  login: (
    cpf: string,
    password: string,
  ) => Promise<Result<UserDTO | null> | undefined>

  createUser: (payload: CreateUserDTO) => Promise<UserDTO | null>

  hashPassword: (password: string) => Promise<string>
}
