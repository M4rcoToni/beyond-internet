import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('beyond.db')

export const initializeDatabase = () => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS users
      (
          id         INTEGER PRIMARY KEY AUTOINCREMENT,
          name       TEXT    NOT NULL,
          cpf        TEXT    NOT NULL UNIQUE,
          password   TEXT    NOT NULL,
      )`,
    )
    console.log('conectado')
  })
}
