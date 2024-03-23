import * as SQLite from 'expo-sqlite'

const db = SQLite.openDatabase('beyond.db')

export { db }
