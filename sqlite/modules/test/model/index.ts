import * as SQLite from 'expo-sqlite'

export async function initializeTableTest(
  db: SQLite.SQLiteDatabase,
): Promise<void> {
  return new Promise((resolve) => {
    db.transaction((tx) => {
      tx.executeSql(
        `CREATE TABLE IF NOT EXISTS test
        (
            id            INTEGER PRIMARY KEY AUTOINCREMENT,
            testId        INTEGER NOT NULL,
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
// String.prototype.hashCode = function() {
//   var hash = 0,
//     i, chr;
//   if (this.length === 0) return hash;
//   for (i = 0; i < this.length; i++) {
//     chr = this.charCodeAt(i);
//     hash = ((hash << 5) - hash) + chr;
//     hash |= 0; // Convert to 32bit integer
//   }
//   return hash;
// }

// const str = 'revenue'
// console.log(str, str.hashCode())
