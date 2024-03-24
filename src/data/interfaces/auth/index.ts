import { Result } from '@data/result'
import {
  CreateUserDTO,
  UserDTO,
} from '@sqlite/modules/users/interfaces/IUserInterface'

export interface IAuthRepository {
  login: (
    cpf: string,
    password: string,
  ) => Promise<Result<UserDTO | null> | undefined>

  createUser: (payload: CreateUserDTO) => Promise<UserDTO | null>

  hashPassword: (password: string) => Promise<string>

  first: () => Promise<UserDTO | null>
}

export interface IAuthService {
  login: (cpf: string, password: string) => Promise<Result<UserDTO | null>>

  createUser: (payload: CreateUserDTO) => Promise<UserDTO | null>

  hashPassword: (password: string) => Promise<string>

  first: () => Promise<UserDTO | null>
}
