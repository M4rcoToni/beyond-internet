import { CreateUserDTO } from '../interfaces/IUserInterface'
import { UserModel } from '../model'
import { UserService } from '../service'

export class UserController {
  private userService: UserService

  constructor(userService: UserService) {
    this.userService = userService
  }

  async createUser(payload: CreateUserDTO): Promise<UserModel | null> {
    try {
      const user = await this.userService.createUser(payload)
      return user
    } catch (error) {
      throw new Error()
    }
  }

  async findById(id: number): Promise<UserModel | null> {
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
  ): Promise<UserModel | null> {
    try {
      const user = await this.userService.findByField(field, value)
      return user
    } catch (error) {
      throw new Error()
    }
  }
}
