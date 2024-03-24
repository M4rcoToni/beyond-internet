// export const IUserInterface = Symbol.for('IUserInterface')

export type UserDTO = {
  id?: number
  name: string
  cpf: string
  isLogged?: number
}

export type CreateUserDTO = {
  name: string
  cpf: string
  password: string
  isLogged?: number
}

export type UpdateUserDTO = Partial<CreateUserDTO>

export interface IUserRepository {
  create(payload: CreateUserDTO): Promise<UserDTO | null>
  update(id: number, data: UpdateUserDTO): Promise<UserDTO | null>
  findById(id: number): Promise<UserDTO | null>
  findByField(
    field: keyof CreateUserDTO,
    value: string,
  ): Promise<UserDTO | null>
  hashPassword(password: string): Promise<string>
  first(): Promise<UserDTO | null>
}

export interface IUserService {
  create(payload: CreateUserDTO): Promise<UserDTO | null>
  update(id: number, data: UpdateUserDTO): Promise<UserDTO | null>
  findById(id: number): Promise<UserDTO | null>
  findByField(
    field: keyof CreateUserDTO,
    value: string,
  ): Promise<UserDTO | null>
  hashPassword(password: string): Promise<string>
  first(): Promise<UserDTO | null>
}