import * as SQLite from 'expo-sqlite'

export async function initializeTableTest(
  db: SQLite.SQLiteDatabase,
): Promise<void> {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS tests
        (
            testId        INTEGER PRIMARY KEY NOT NULL,
            sectionId     INTEGER NOT NULL,
            title         TEXT NOT NULL,
            completed     INTEGER DEFAULT 0
        )`,
        [],
        () => {
          resolve()
        },
        (_, error) => {
          throw new Error(`Error creating table test: ${error}`)
        },
      )
    })
  })
}

export class TestModel {
  testId?: string
  sectionId: string
  title: string
  completed: boolean
}
