import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('beyond.db')

export async function initializeDatabase(): Promise<void> {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS users
        (
            id         INTEGER PRIMARY KEY AUTOINCREMENT,
            name       TEXT    NOT NULL,
            cpf        TEXT    NOT NULL UNIQUE,
            password   TEXT    NOT NULL,
            isLogged   INTEGER DEFAULT 0
        )`,
        [],
        () => {
          console.log('Table created successfully')
          resolve() // Resolve the promise when table creation is complete
        },
        (_, error) => {
          throw new Error(`Error creating table: ${error}`)
        },
      )
    })
  })
}
