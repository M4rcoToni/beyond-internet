import * as SQLite from 'expo-sqlite'
import { BaseRepository } from '@sqlite/modules/common/BaseRepository'
import { SectionModel } from '../model'
import { ISectionRepository, SectionDTO } from '../interfaces/ISectionInterface'

export class SectionRepository
  extends BaseRepository<SectionModel>
  implements ISectionRepository
{
  async create(payload: SectionDTO): Promise<SectionDTO | null> {
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

  async update(id: number, data: SectionDTO): Promise<SectionDTO | null> {
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

  async findById(id: number): Promise<SectionDTO | null> {
    let section: SectionDTO | null = null

    await this.db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
      const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`
      const result = await tx.executeSqlAsync(sql, [id])

      if ('rows' in result) {
        section = result.rows[0] as SectionDTO
      }
    })

    return section
  }

  async list(): Promise<SectionDTO[]> {
    let sections: SectionDTO[] = []

    await this.db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
      const sql = `SELECT * FROM ${this.tableName}`
      const result = await tx.executeSqlAsync(sql)

      if ('rows' in result) {
        sections = result.rows as SectionDTO[]
      }
    })

    return sections
  }

  async delete(id: string): Promise<boolean> {
    let deleted = false

    await this.db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
      const sql = `DELETE FROM ${this.tableName} WHERE id = ?`
      await tx.executeSqlAsync(sql, [id])
      deleted = true
    })

    return deleted
  }
}