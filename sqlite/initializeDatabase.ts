import * as SQLite from 'expo-sqlite'
import { initializeTableUsers } from './modules/users/model'
import { initializeTableCourses } from './modules/course/model'
import { initializeTableSections } from './modules/sections/model'

export async function initializeDatabase() {
  const db = SQLite.openDatabase('beyond.db')

  // prune the database
  // db.transaction((tx) => {
  //   //   tx.executeSql('DROP TABLE IF EXISTS users;')
  //   tx.executeSql('DROP TABLE IF EXISTS course;')
  // })

  const promises = [
    Promise.resolve(initializeTableUsers(db)),
    Promise.resolve(initializeTableCourses(db)),
    Promise.resolve(initializeTableSections(db)),
  ]

  Promise.allSettled(promises)
    .then(() => {
      console.log('Database inicializado com sucesso!')
      return true
    })
    .catch((error) => {
      console.error('Erro na criação das tabelas:', error)
      return false
    })
    .then(async (result) => {
      // await db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
      //   // show all columns from the users table
      //   await tx.executeSqlAsync('PRAGMA table_info(users);').then((result) => {
      //     console.log(result)
      //   })
      // })

      // select all users
      await db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
        await tx.executeSqlAsync('SELECT * FROM users;').then((result) => {
          console.log(result)
        })
      })

      // select all courses
      // await db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
      //   await tx.executeSqlAsync('SELECT * FROM course;').then((result) => {
      //     console.log(result)
      //   })
      // })

      // select all sections
      await db.transactionAsync(async (tx: SQLite.SQLTransactionAsync) => {
        await tx.executeSqlAsync('SELECT * FROM sections;').then((result) => {
          console.log('sections', result)
        })
      })
      return result
    })
}
