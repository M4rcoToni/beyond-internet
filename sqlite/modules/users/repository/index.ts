import * as SQLite from 'expo-sqlite'
import { CreateUserDTO } from '../interfaces/IUserInterface'
import { UserModel } from '../model'
import { BaseRepository } from '@sqlite/modules/common/BaseRepository'

export class UserRepository extends BaseRepository<UserModel> {
  async createUser(payload: CreateUserDTO): Promise<UserModel | null> {
    let insertedId: number | undefined
    await this.db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
      const fields = Object.keys(payload)
      const values = Object.values(payload)

      const sql = `INSERT INTO ${this.tableName} (${fields.join(
        ', ',
      )}) VALUES (${fields.map(() => '?').join(', ')})`

      const res = await tx.executeSqlAsync(sql, values)
      if ('insertId' in res) {
        insertedId = res.insertId
      }
    })
    return this.findById(insertedId || 0)
  }

  async findById(id: number): Promise<UserModel | null> {
    let user: UserModel | null = null
    await this.db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
      const result = await tx.executeSqlAsync(
        `SELECT * FROM ${this.tableName} WHERE id = ?`,
        [id],
      )

      if ('rows' in result) {
        user = result.rows[0] as UserModel
      }
    })

    return user || ({} as UserModel)
  }

  async findByField(
    field: keyof CreateUserDTO,
    value: string,
  ): Promise<UserModel | null> {
    let user: UserModel | null = {} as UserModel
    await this.db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
      const result = await tx.executeSqlAsync(
        `SELECT * FROM ${this.tableName} WHERE ${field} = ?`,
        [value],
      )

      if ('rows' in result) {
        user = result.rows[0] as UserModel
      }
    })

    return user || null
  }
}
