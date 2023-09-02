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
              const { id, name, cpf, password } = result.rows.item(0)
              const user: User = {
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
            throw new Error(`Erro no SQL ${error}`)
          },
        )
      })
    })
  } catch (error) {
    throw new Error(`Erro ao buscar o usuário ${error}`)
  }
}
