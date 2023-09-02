import { User } from '../model'
import { createUser, getUserByCPF } from '../repository/UserRepository'
import * as Crypto from 'expo-crypto'

export const createUserController: typeof createUser = async ({
  cpf,
  name,
  password,
}) => {
  const userExists = await getUserByCPF(cpf)

  if (userExists) {
    console.log('Usuário já existe')

    return null
  }
  console.log('Passou')

  const passwordHash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.MD2,
    password,
  )
  password = passwordHash

  const response = await createUser({ cpf, name, password })
  console.log('response', response)

  if (response === null) {
    return null
  }

  return response
}

export const getUserByCPFController: typeof getUserByCPF = async (cpf) => {
  const response = await getUserByCPF(cpf)
  if (response === null) {
    return null
  }
  return response
}
