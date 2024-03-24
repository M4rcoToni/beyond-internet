// export const IUserInterface = Symbol.for('IUserInterface')

export type UserDTO = {
  id?: number
  name: string
  cpf: string
}

export type CreateUserDTO = {
  name: string
  cpf: string
  password: string
}

export type UpdateUserDTO = Partial<CreateUserDTO>

export interface IUserInterface {
  create(data: CreateUserDTO): Promise<UserDTO>
  update(id: string, data: UpdateUserDTO): Promise<UserDTO>
}
