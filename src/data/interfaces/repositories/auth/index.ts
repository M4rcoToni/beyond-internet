import { UserDTO } from '@sqlite/modules/users/interfaces/IUserInterface'
import { Result } from '../../../result/index'

export interface IAuthRepository {
  login: (
    cpf: string,
    password: string,
  ) => Promise<Result<UserDTO | null> | undefined>
}
