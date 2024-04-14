import * as SQLite from 'expo-sqlite'

export async function initializeTableSections(
  db: SQLite.SQLiteDatabase,
): Promise<void> {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS sections
        (
            id            INTEGER PRIMARY KEY,
            courseId      INTEGER NOT NULL,
            title         TEXT NOT NULL, 
            description   TEXT NOT NULL,
            images        TEXT,
            videos        TEXT,
            pdfs          TEXT
        )`,
        [],
        () => {
          resolve()
        },
        (_, error) => {
          throw new Error(`Error creating table sections: ${error}`)
        },
      )
    })
  })
}

export class SectionModel {
  id?: string
  order: number
  courseId: string
  title: string
  description: string
  images: string | null
  videos: string | null
  pdfs: string | null
}
