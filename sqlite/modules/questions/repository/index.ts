import * as SQLite from 'expo-sqlite'
import { BaseRepository } from '@sqlite/modules/common/BaseRepository'
import { QuestionModel } from '@sqlite/modules/questions/model'
import { IQuestionsRepository } from '@sqlite/modules/questions/interfaces/IQuestionsInterface'

export class QuestionsRepository
  extends BaseRepository<QuestionModel>
  implements IQuestionsRepository
{
  async create(payload: QuestionModel): Promise<QuestionModel | null> {
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

  async update(id: number, data: QuestionModel): Promise<QuestionModel | null> {
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

  async findById(id: number): Promise<QuestionModel | null> {
    let question: QuestionModel | null = null

    await this.db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
      const sql = `SELECT * FROM ${this.tableName} WHERE testId = ?`
      const result = await tx.executeSqlAsync(sql, [id])

      if ('rows' in result) {
        question = result.rows[0] as QuestionModel
      }
    })

    return question
  }

  async list(testId: number): Promise<QuestionModel[]> {
    let questions: QuestionModel[] = []

    await this.db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
      const sql = `SELECT * FROM ${this.tableName} where testId = ?`
      const result = await tx.executeSqlAsync(sql, [testId])

      if ('rows' in result) {
        questions = result.rows as QuestionModel[]
      }
    })

    return questions
  }

  async delete(testId: number): Promise<boolean> {
    let deleted = false

    await this.db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
      const sql = `DELETE FROM ${this.tableName} WHERE testId = ?`
      await tx.executeSqlAsync(sql, [testId])
      deleted = true
    })

    return deleted
  }
}
