import * as SQLite from 'expo-sqlite'

export async function initializeTableCourses(
  db: SQLite.SQLiteDatabase,
): Promise<void> {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS course
        (
            id            INTEGER PRIMARY KEY AUTOINCREMENT,
            courseId      INTEGER NOT NULL,
            directoryName TEXT NOT NULL,
            uri           TEXT NOT NULL,
            images        TEXT NOT NULL,
            videos        TEXT NOT NULL,
            pdfs          TEXT NOT NULL,
            banner        TEXT NOT NULL,
            indexFile     TEXT NOT NULL,
            completedDate TEXT NOT NULL,
            granted       INTEGER DEFAULT 0
        )`,
        [],
        () => {
          resolve()
        },
        (_, error) => {
          throw new Error(`Error creating table course: ${error}`)
        },
      )
    })
  })
}

export class CourseModel {
  id?: string
  courseId: string
  directoryName: string
  uri: string
  images: string
  videos: string
  pdfs: string
  banner: string
  index: string
  granted: number
}
