import { BaseModel } from '@sqlite/modules/common/BaseModel'
import * as SQLite from 'expo-sqlite'

export async function initializeTableUsers(
  db: SQLite.SQLiteDatabase,
): Promise<void> {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS users
        (
            id         INTEGER PRIMARY KEY AUTOINCREMENT,
            name       TEXT    NOT NULL,
            cpf        TEXT    NOT NULL UNIQUE,
            password   TEXT    NOT NULL,
            isLogged   INTEGER DEFAULT 0
        )`,
        [],
        () => {
          resolve() // Resolve the promise when table creation is complete
        },
        (_, error) => {
          throw new Error(`Error creating table: ${error}`)
        },
      )
    })
  })
}

// this is user model extending the base model (expo-sqlite)
export class UserModel {
  static tableName = 'users'

  // database fields
  id: number
  name: string
  cpf: string
  password: string
  createdAt: Date
  updatedAt: Date

  // computed properties
  get avatar() {
    return `https://api.multiavatar.com/${this.name}.png`
  }

  // static method to create user and return the user object
  // static async create(payload: CreateUserDTO) {
  //   console.log('payload', payload)
  //   let insertedId: number | undefined
  //   await this.db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
  //     const fields = Object.keys(payload)
  //     const values = Object.values(payload)

  //     const sql = `INSERT INTO ${this.tableName} (${fields.join(
  //       ', ',
  //     )}) VALUES (${fields.map(() => '?').join(', ')})`

  //     const res = await tx.executeSqlAsync(sql, values)
  //     if ('insertId' in res) {
  //       insertedId = res.insertId
  //     }
  //   })
  //   return this.first(insertedId || 0)
  // }

  // static method to find user by id
  // static async first(id: number) {
  //   let user: UserDTO | null = null
  //   await this.db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
  //     const result = await tx.executeSqlAsync(
  //       `SELECT * FROM ${this.tableName} WHERE id = ?`,
  //       [id],
  //     )

  //     if ('rows' in result) {
  //       user = result.rows[0] as UserDTO
  //     }
  //   })

  //   return user || ({} as UserDTO)
  // }

  // static method to find generic user by field
  // static async find(field: keyof CreateUserDTO, value: string) {
  //   let user: CreateUserDTO | null = {} as CreateUserDTO
  //   await this.db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
  //     const result = await tx.executeSqlAsync(
  //       `SELECT * FROM ${this.tableName} WHERE ${field} = ?`,
  //       [value],
  //     )

  //     if ('rows' in result) {
  //       user = result.rows[0] as CreateUserDTO
  //     }
  //   })

  //   return user || null
  // }
}
