import { User } from '../model'
import { createUser, getUserByCPF } from '../repository/UserRepository'
import * as Crypto from 'expo-crypto'

export async function createUserController(user: User): Promise<boolean> {
  const { password, cpf } = user
  const userExists = await getUserByCPF(cpf)

  if (userExists !== null) {
    const passwordHash = await Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.MD2,
      password,
    )
    user.password = passwordHash

    const response = await createUser(user)
    if (response === false) {
      return false
    }

    return true
  } else {
    return false
  }
}

export const getUserByCPFController: typeof getUserByCPF = async (cpf) => {
  const response = await getUserByCPF(cpf)
  if (response === null) {
    return null
  }
  return response
}
