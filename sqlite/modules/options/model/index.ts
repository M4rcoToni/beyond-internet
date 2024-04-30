import * as SQLite from 'expo-sqlite'

export async function initializeTableOptions(
  db: SQLite.SQLiteDatabase,
): Promise<void> {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS options
          (
            id            INTEGER PRIMARY KEY AUTOINCREMENT,
            questionId    INTEGER NOT NULL,
            description   TEXT NOT NULL
          )`,
        [],
        () => {
          resolve()
        },
        (_, error) => {
          throw new Error(`Error creating table options: ${error}`)
        },
      )
    })
  })
}

export class OptionsModel {
  id?: number
  questionId: number
  description: string
}
