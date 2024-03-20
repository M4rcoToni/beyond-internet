/* eslint-disable n/no-callback-literal */
import { db } from 'databases'
import { User } from '../model'

export async function createUser({
  name,
  cpf,
  password,
}: User): Promise<User | null> {
  try {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO users (name, cpf, password) VALUES (?, ?, ?)',
          [name, cpf, password],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve({ name, cpf, password })
            } else {
              resolve(null)
            }
          },
          (_, error) => {
            throw new Error(`Erro no SQL ${error}`)
          },
        )
      })
    })
  } catch (error) {
    throw new Error(`Erro ao buscar o usuário ${error}`)
  }
}

export async function getUserByCPF(cpf: string): Promise<User | null> {
  try {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM users WHERE cpf = ?',
          [cpf],
          (_, result) => {
            if (result.rows.length > 0) {
              const { id, name, cpf, password, isLogged } = result.rows.item(0)
              const user: User = {
                id,
                name,
                cpf,
                password,
                isLogged,
              }
              resolve(user)
            } else {
              resolve(null)
            }
          },
          (_, error) => {
            throw new Error(`Erro no SQL ${error}`)
          },
        )
      })
    })
  } catch (error) {
    throw new Error(`Erro ao buscar o usuário ${error}`)
  }
}

export async function updateUserIsLogged(
  cpf: string,
  isLogged: number,
): Promise<string | null> {
  try {
    return new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          'UPDATE users SET isLogged = ? WHERE cpf = ?',
          [isLogged, cpf],
          (_, result) => {
            if (result.rowsAffected > 0) {
              resolve(cpf)
            } else {
              resolve(null)
            }
          },
          (_, error) => {
            throw new Error(`Error updating user isLogged: ${error}`)
          },
        )
      })
    })
  } catch (error) {
    throw new Error(`Error updating user isLogged: ${error}`)
  }
}

export async function loadUserData(): Promise<User | null> {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM users WHERE isLogged = 1', // Supondo que você marque usuários como logados no banco de dados
        [],
        (_, result) => {
          if (result.rows.length > 0) {
            const { id, name, cpf, password } = result.rows.item(0)
            const user = {
              id,
              name,
              cpf,
              password,
            }
            resolve(user)
          } else {
            resolve(null)
          }
        },
        (_, error) => {
          throw new Error(`Error loading user data: ${error}`)
        },
      )
    })
  })
}
