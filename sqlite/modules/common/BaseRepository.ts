import * as SQLite from 'expo-sqlite'

export abstract class BaseRepository<T> {
  protected db: SQLite.SQLiteDatabase
  protected tableName: string

  constructor(db: SQLite.SQLiteDatabase, tableName: string) {
    this.db = db
    this.tableName = tableName
  }
}
