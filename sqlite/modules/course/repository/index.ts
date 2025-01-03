import * as SQLite from 'expo-sqlite'
import { BaseRepository } from '@sqlite/modules/common/BaseRepository'
import { CourseModel } from '../model'
import {
  CourseDTO,
  CreateCourseDTO,
  ICourseRepository,
} from '../interfaces/ICourseInterfaces'

export class CourseRepository
  extends BaseRepository<CourseModel>
  implements ICourseRepository
{
  async create(payload: CreateCourseDTO): Promise<CourseDTO | null> {
    const granted = payload.granted ? 1 : 0
    payload.granted = granted

    const courseAlreadyExists = await this.findById(payload.courseId)

    if (courseAlreadyExists) {
      return null
    }

    await this.db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
      const fields = Object.keys(payload)

      const values = Object.values(payload)

      const sql = `INSERT INTO ${this.tableName} (${fields.join(
        ', ',
      )}) VALUES (${fields.map(() => '?').join(', ')})`

      const res = await tx.executeSqlAsync(sql, values)
    })

    const course = await this.findById(payload.courseId || '')

    return course
  }

  update: (id: string, data: CourseDTO) => Promise<CourseDTO | null>

  async findById(id: string): Promise<CourseDTO | null> {
    let user: CourseDTO | null = null
    await this.db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
      const result = await tx.executeSqlAsync(
        `SELECT * FROM ${this.tableName} WHERE courseId = ?`,
        [id],
      )

      if ('rows' in result) {
        user = result.rows[0] as CourseDTO
      }
    })

    return user
  }

  async list(): Promise<CourseDTO[]> {
    const courses: CourseDTO[] = []

    await this.db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
      const result = await tx.executeSqlAsync(`SELECT * FROM ${this.tableName}`)

      if ('rows' in result) {
        for (let i = 0; i < result.rows.length; i++) {
          courses.push(result.rows[i] as CourseDTO)
        }
      }
    })

    return courses
  }

  async delete(id: string): Promise<boolean> {
    let deleted = false
    await this.db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
      await tx.executeSqlAsync(
        `DELETE FROM ${this.tableName} WHERE courseId = ?`,
        [id],
      )
      deleted = true
    })

    return deleted
  }

  async finishCourse(id: string): Promise<boolean> {
    let finished = false
    const completedDate = new Date().toLocaleDateString('pt-BR')
    await this.db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
      await tx.executeSqlAsync(
        `UPDATE ${this.tableName} SET completedDate = ? WHERE courseId = ?`,
        [completedDate, id],
      )
      finished = true
    })

    return finished
  }
}
