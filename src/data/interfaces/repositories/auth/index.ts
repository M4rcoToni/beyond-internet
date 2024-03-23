import { User } from 'databases/modules/users/model'
import { Result } from '../../../result/index'

export interface IAuthRepository {
  login: (
    cpf: string,
    password: string,
  ) => Promise<Result<User | null> | undefined>
}
