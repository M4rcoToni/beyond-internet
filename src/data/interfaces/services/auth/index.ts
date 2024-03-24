import { Result } from '@data/result'
import {
  CreateUserDTO,
  UserDTO,
} from '@sqlite/modules/users/interfaces/IUserInterface'

export interface IAuthService {
  login: (cpf: string, password: string) => Promise<Result<UserDTO | null>>
  createUser: (payload: CreateUserDTO) => Promise<UserDTO | null>
  hashPassword: (password: string) => Promise<string>
}
