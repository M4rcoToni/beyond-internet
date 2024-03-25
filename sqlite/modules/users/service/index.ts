import {
  CreateUserDTO,
  IUserService,
  UserDTO,
} from '../interfaces/IUserInterface'
import { UserRepository } from '../repository'

export class UserService implements IUserService {
  private userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  update(id: number, data: Partial<CreateUserDTO>): Promise<UserDTO | null> {
    return this.userRepository.update(id, data)
  }

  create(payload: CreateUserDTO): Promise<UserDTO | null> {
    return this.userRepository.create(payload)
  }

  findById(id: number): Promise<UserDTO | null> {
    return this.userRepository.findById(id)
  }

  findByField(
    field: keyof CreateUserDTO,
    value: string,
  ): Promise<UserDTO | null> {
    return this.userRepository.findByField(field, value)
  }

  hashPassword(password: string): Promise<string> {
    return this.userRepository.hashPassword(password)
  }

  first(): Promise<UserDTO | null> {
    return this.userRepository.first()
  }

  login(cpf: string, password: string): Promise<UserDTO | null> {
    return this.userRepository.login(cpf, password)
  }
}
