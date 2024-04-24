import * as SQLite from 'expo-sqlite'
import { BaseRepository } from '@sqlite/modules/common/BaseRepository'
import { TestModel } from '@sqlite/modules/tests/model'
import {
  ITestsRepository,
  TestsDTO,
} from '@sqlite/modules/tests/interfaces/ITestInterface'

export class TestsRepository
  extends BaseRepository<TestModel>
  implements ITestsRepository
{
  async create(payload: TestsDTO): Promise<TestsDTO | null> {
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
      } else {
        console.log('TestsRepository', res)
      }
    })

    return this.findById(insertedId || 0)
  }

  async update(id: number, data: TestsDTO): Promise<TestsDTO | null> {
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

  async findById(id: number): Promise<TestsDTO | null> {
    let test: TestsDTO | null = null

    await this.db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
      const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`
      const result = await tx.executeSqlAsync(sql, [id])

      if ('rows' in result) {
        test = result.rows[0] as TestsDTO
      }
    })

    return test
  }

  async list(): Promise<TestsDTO[]> {
    let tests: TestsDTO[] = []

    await this.db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
      const sql = `SELECT * FROM ${this.tableName}`
      const result = await tx.executeSqlAsync(sql)

      if ('rows' in result) {
        tests = result.rows as TestsDTO[]
      }
    })

    return tests
  }

  async delete(id: number): Promise<boolean> {
    let deleted = false

    await this.db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
      const sql = `DELETE FROM ${this.tableName} WHERE id = ?`
      await tx.executeSqlAsync(sql, [id])
      deleted = true
    })

    return deleted
  }
}
