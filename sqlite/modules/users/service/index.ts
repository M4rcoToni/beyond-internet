import { CreateUserDTO } from '../interfaces/IUserInterface'
import { UserModel } from '../model'
import { UserRepository } from '../repository'

export class UserService {
  private userRepository: UserRepository

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository
  }

  async createUser(payload: CreateUserDTO): Promise<UserModel | null> {
    return this.userRepository.createUser(payload)
  }

  async findById(id: number): Promise<UserModel | null> {
    return this.userRepository.findById(id)
  }

  async findByField(
    field: keyof CreateUserDTO,
    value: string,
  ): Promise<UserModel | null> {
    return this.userRepository.findByField(field, value)
  }
}
