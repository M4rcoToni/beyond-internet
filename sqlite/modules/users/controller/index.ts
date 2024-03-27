import { CreateUserDTO, UserDTO } from '../interfaces/IUserInterface'
import { UserService } from '../service'

export class UserController {
  private userService: UserService

  constructor(userService: UserService) {
    this.userService = userService
  }

  async create(payload: CreateUserDTO): Promise<UserDTO | null> {
    try {
      return await this.userService.create(payload)
    } catch (error) {
      throw new Error()
    }
  }

  async update(
    id: number,
    data: Partial<CreateUserDTO>,
  ): Promise<UserDTO | null> {
    try {
      return await this.userService.update(id, data)
    } catch (error) {
      throw new Error()
    }
  }

  async findById(id: number): Promise<UserDTO | null> {
    try {
      return await this.userService.findById(id)
    } catch (error) {
      throw new Error()
    }
  }

  async findByField(
    field: keyof CreateUserDTO,
    value: string,
  ): Promise<UserDTO | null> {
    try {
      return await this.userService.findByField(field, value)
    } catch (error) {
      throw new Error()
    }
  }

  async hashPassword(password: string): Promise<string> {
    try {
      return await this.userService.hashPassword(password)
    } catch (error) {
      throw new Error()
    }
  }

  async first(): Promise<UserDTO | null> {
    try {
      return await this.userService.first()
    } catch (error) {
      throw new Error()
    }
  }

  async login(cpf: string, password: string): Promise<UserDTO | null> {
    try {
      return await this.userService.login(cpf, password)
    } catch (error) {
      throw new Error()
    }
  }
}
