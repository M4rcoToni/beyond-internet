import { User } from '../model/User'
import { createUser, getUserByCPF } from '../repository/UserRepository'

export const createUserController = (
  name: string,
  cpf: string,
  password: string,
  callback: (userId: number | null) => void,
) => {
  createUser(name, cpf, password, callback)
}

export const getUserCPFController = (
  cpf: string,
  callback: (user: User | boolean) => void,
) => {
  getUserByCPF(cpf, callback)
}
