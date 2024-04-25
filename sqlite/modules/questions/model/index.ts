import * as SQLite from 'expo-sqlite'

export async function initializeTableQuestions(
  db: SQLite.SQLiteDatabase,
): Promise<void> {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS questions
        (
            questionId    INTEGER PRIMARY KEY NOT NULL,
            testId        INTEGER NOT NULL,
            description   TEXT NOT NULL,
            answer        TEXT NOT NULL
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

export class QuestionModel {
  questionId?: number
  testId: number
  answer: string
  description: string
}
