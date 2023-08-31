/* eslint-disable n/no-callback-literal */
import { db } from 'databases'
import { User } from '../model/User'

export const createUser = async (
  name: string,
  cpf: string,
  password: string,
  callback: (userId: number | null) => void,
) => {
  try {
    await new Promise((resolve) => {
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO users (name, cpf, password) VALUES (?, ?, ?)',
          [name, cpf, password],
          (_, result) => {
            callback(result.insertId ?? null)
            resolve(result.insertId)
          },
        )
      })
      console.log('salvo')
    })
  } catch (error) {
    console.log(error)

    return false
  }
}

export const getUserByCPF = async (
  cpf: string,
  callback: (user: User | boolean) => void,
) => {
  try {
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

            callback(user)
          } else {
            callback(false)
          }
        },
        (_, error) => {
          console.error('Erro ao buscar o usuário', error)
          return false
          // Não retornando nada (não retornando erro ou valor)
        },
      )
    })
  } catch (error) {
    console.log(error)
    return false
  }
}
