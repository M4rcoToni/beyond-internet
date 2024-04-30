import * as SQLite from 'expo-sqlite'
import { initializeTableUsers } from './modules/users/model'
import { initializeTableCourses } from './modules/course/model'
import { initializeTableSections } from './modules/sections/model'
import { initializeTableTest } from '@sqlite/modules/tests/model'
import { initializeTableQuestions } from '@sqlite/modules/questions/model'
import { initializeTableOptions } from '@sqlite/modules/options/model'

export async function initializeDatabase() {
  const db = SQLite.openDatabase('beyond.db')

  const promises = [
    initializeTableUsers(db),
    initializeTableCourses(db),
    initializeTableSections(db),
    initializeTableTest(db),
    initializeTableQuestions(db),
    initializeTableOptions(db),
  ]

  try {
    const res = await Promise.allSettled(promises)
    console.log('Database inicializado com sucesso!')

    console.log(res.filter((r) => r.status === 'rejected'))

    const tables = [
      'users',
      'course',
      'sections',
      'tests',
      'questions',
      'options',
    ]

    for (const table of tables) {
      await executeAndLog(db, table)
    }

    return true
  } catch (error) {
    console.error('Erro na criação das tabelas:', error)
    return false
  }
}

async function executeAndLog(db: SQLite.SQLiteDatabase, table: string) {
  await db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
    await tx.executeSqlAsync(`SELECT * FROM ${table};`).then((result) => {
      console.log(table, result)
    })
  })
}
