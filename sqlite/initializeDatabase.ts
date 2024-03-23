import * as SQLite from 'expo-sqlite'
import { initializeTableUsers } from './modules/users/model'
import { initializeTableCourses } from './modules/course/model'

export async function initializeDatabase() {
  const db = SQLite.openDatabase('beyond.db')

  const promises = [
    Promise.resolve(initializeTableUsers(db)),
    Promise.resolve(initializeTableCourses(db)),
  ]

  Promise.all(promises)
    .then(() => {
      console.log('Tabela criada')
      return true
    })
    .catch((error) => {
      console.error('Erro na criação das tabelas:', error)
      return false
    })
    .then((result) => {
      return result
    })
}
