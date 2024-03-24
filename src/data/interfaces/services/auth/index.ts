import { Result } from '@data/result'
import { UserDTO } from '@sqlite/modules/users/interfaces/IUserInterface'

export interface IAuthService {
  login: (cpf: string, password: string) => Promise<Result<UserDTO | null>>
}
