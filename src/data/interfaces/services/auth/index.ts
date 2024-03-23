import { Result } from '@data/result'
import { User } from '../../../../../sqlite/modules/users/model'

export interface IAuthService {
  login: (cpf: string, password: string) => Promise<Result<User | null>>
}
