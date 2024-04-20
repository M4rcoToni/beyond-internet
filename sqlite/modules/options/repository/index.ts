import * as SQLite from 'expo-sqlite'
import { BaseRepository } from '@sqlite/modules/common/BaseRepository'
import { OptionsModel } from '@sqlite/modules/options/model'
import { IOptionsRepository } from '@sqlite/modules/options/interfaces/IOptionsInterface'

export class OptionsRepository
  extends BaseRepository<OptionsModel>
  implements IOptionsRepository
{
  async create(payload: OptionsModel): Promise<OptionsModel | null> {
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

  async update(id: number, data: OptionsModel): Promise<OptionsModel | null> {
    await this.db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
      const fields = Object.keys(data)
      const values = Object.values(data)

      const sql = `UPDATE ${this.tableName} SET ${fields
        .map((field) => `${field} = ?`)
        .join(', ')} WHERE id = ?`

      await tx.executeSqlAsync(sql, [...values, id])
    })

    return this.findById(id)
  }

  async findById(id: number): Promise<OptionsModel | null> {
    let options: OptionsModel | null = null

    await this.db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
      const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`
      const result = await tx.executeSqlAsync(sql, [id])

      if ('rows' in result) {
        options = result.rows[0] as OptionsModel
      }
    })

    return options
  }

  async list(questionId: number): Promise<OptionsModel[]> {
    let options: OptionsModel[] = []

    await this.db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
      const sql = `SELECT * FROM ${this.tableName} WHERE questionId = ?`
      const result = await tx.executeSqlAsync(sql, [questionId])

      if ('rows' in result) {
        options = result.rows as OptionsModel[]
      }
    })

    return options
  }

  async delete(questionId: number): Promise<boolean> {
    let deleted = false

    await this.db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
      const sql = `DELETE FROM ${this.tableName} WHERE questionId = ?`
      await tx.executeSqlAsync(sql, [questionId])

      deleted = true
    })

    return deleted
  }
}
