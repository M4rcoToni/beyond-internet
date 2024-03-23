import { Result } from '@data/result'
import { User } from 'databases/modules/users/model'

export interface IAuthService {
  login: (cpf: string, password: string) => Promise<Result<User | null>>
}
