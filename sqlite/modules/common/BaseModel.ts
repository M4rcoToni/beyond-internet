import { db } from '@sqlite/index'
import * as SQLite from 'expo-sqlite'

// this class use pure sqlite3, so it can be used in any project
export abstract class BaseModel {
  static db: SQLite.SQLiteDatabase = db
  static tableName: string
}
