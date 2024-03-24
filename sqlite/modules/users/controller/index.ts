import { CreateUserDTO, UserDTO } from '../interfaces/IUserInterface'
import { UserService } from '../service'

export class UserController {
  private userService: UserService

  constructor(userService: UserService) {
    this.userService = userService
  }

  async createUser(payload: CreateUserDTO): Promise<UserDTO | null> {
    try {
      const user = await this.userService.create(payload)
      return user
    } catch (error) {
      throw new Error()
    }
  }

  async findById(id: number): Promise<UserDTO | null> {
    try {
      const user = await this.userService.findById(id)
      return user
    } catch (error) {
      throw new Error()
    }
  }

  async findByField(
    field: keyof CreateUserDTO,
    value: string,
  ): Promise<UserDTO | null> {
    try {
      const user = await this.userService.findByField(field, value)
      return user
    } catch (error) {
      throw new Error()
    }
  }

  async hashPassword(password: string): Promise<string> {
    try {
      const passwordHash = await this.userService.hashPassword(password)
      return passwordHash
    } catch (error) {
      throw new Error()
    }
  }
}
