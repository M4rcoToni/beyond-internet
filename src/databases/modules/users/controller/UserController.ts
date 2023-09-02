import { User } from '../model'
import { createUser, getUserByCPF } from '../repository/UserRepository'

export async function createUserController(user: User): Promise<boolean> {
  const response = await createUser(user)
  if (response === false) {
    return false
  }
  return true
}

export const getUserByCPFController: typeof getUserByCPF = async (cpf) => {
  const response = await getUserByCPF(cpf)
  if (response === null) {
    return null
  }
  return response
}
