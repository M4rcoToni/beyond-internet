import {
  createUser,
  getUserByCPF,
  loadUserData,
  updateUserIsLogged,
} from '../repository/UserRepository'
import * as Crypto from 'expo-crypto'

export const createUserController: typeof createUser = async ({
  cpf,
  name,
  password,
}) => {
  const userExists = await getUserByCPF(cpf)

  if (userExists) {
    return null
  }

  const passwordHash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
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

export const updateUserIsLoggedController: typeof updateUserIsLogged = async (
  cpf,
  isLogged,
) => {
  try {
    const updatedCpf = await updateUserIsLogged(cpf, isLogged)

    if (updatedCpf === null) {
      throw new Error(`No user found with CPF: ${cpf}`)
    }

    return updatedCpf
  } catch (error) {
    throw new Error(`Error in updateUserIsLoggedController: ${error}`)
  }
}

export const loadUserDataController: typeof loadUserData = async () => {
  try {
    const user = await loadUserData()

    if (user === null) {
      throw new Error('No logged-in user found')
    }

    return user
  } catch (error) {
    throw new Error(`Error in loadUserDataController: ${error}`)
  }
}
