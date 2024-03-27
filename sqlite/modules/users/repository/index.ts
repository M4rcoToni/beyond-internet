import * as SQLite from 'expo-sqlite'
import {
  CreateUserDTO,
  IUserRepository,
  UserDTO,
} from '../interfaces/IUserInterface'
import { UserModel } from '../model'
import { BaseRepository } from '@sqlite/modules/common/BaseRepository'

export class UserRepository
  extends BaseRepository<UserModel>
  implements IUserRepository
{
  async create(payload: CreateUserDTO): Promise<UserDTO | null> {
    let insertedId: number | undefined

    const user = await this.findByField('cpf', payload.cpf)

    if (user) {
      throw new Error()
    }

    const passwordHash = await UserModel.hashPassword(payload.password)

    payload.password = passwordHash

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
    this.update(insertedId || 0, { isLogged: 1 })

    return this.findById(insertedId || 0)
  }

  async update(
    id: number,
    data: Partial<CreateUserDTO>,
  ): Promise<UserDTO | null> {
    let user: UserDTO | null = null
    await this.db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
      const fields = Object.keys(data)
      const values = Object.values(data)

      const sql = `UPDATE ${this.tableName} SET ${fields
        .map((field) => `${field} = ?`)
        .join(', ')} WHERE id = ?`

      await tx.executeSqlAsync(sql, [...values, id])

      user = await this.findById(id)
    })

    return user || null
  }

  async findById(id: number): Promise<UserDTO | null> {
    let user: UserDTO | null = null
    await this.db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
      const result = await tx.executeSqlAsync(
        `SELECT * FROM ${this.tableName} WHERE id = ?`,
        [id],
      )

      if ('rows' in result) {
        user = result.rows[0] as UserDTO
      }
    })

    return user || ({} as UserDTO)
  }

  async findByField(
    field: keyof CreateUserDTO,
    value: string,
  ): Promise<UserDTO | null> {
    let user: UserDTO | null = {} as UserDTO
    await this.db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
      const result = await tx.executeSqlAsync(
        `SELECT * FROM ${this.tableName} WHERE ${field} = ?`,
        [value],
      )

      if ('rows' in result) {
        user = result.rows[0] as UserDTO
      }
    })

    return user || null
  }

  async hashPassword(password: string): Promise<string> {
    const passwordHash = await UserModel.hashPassword(password)
    return passwordHash
  }

  async first(): Promise<UserDTO | null> {
    let user: UserDTO | null = null
    await this.db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
      const sql = `SELECT * FROM ${this.tableName} WHERE isLogged = 1`
      const result = await tx.executeSqlAsync(sql, [])

      if ('rows' in result) {
        user = result.rows[0] as UserDTO
      }
    })
    return user || null
  }

  async login(cpf: string, password: string): Promise<UserDTO | null> {
    const user = await this.findByField('cpf', cpf)

    if (!user) {
      throw new Error()
    }

    const hash = await UserModel.hashPassword(password)
    let userPassword = ''

    await this.db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
      const sql = `SELECT password FROM ${this.tableName} WHERE cpf = ?`
      const result = await tx.executeSqlAsync(sql, [cpf])

      if ('rows' in result) {
        userPassword = result.rows[0].password
      }
    })

    const passwordMatch = hash === userPassword

    if (!passwordMatch) {
      throw new Error()
    }

    return user
  }
}
