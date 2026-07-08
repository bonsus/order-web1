import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'

const databaseUrl = process.env.DATABASE_URL || './ordeo.db'

// Reuse a single connection across HMR reloads / requests.
const globalForDb = globalThis as unknown as {
  __ordeoSqlite?: Database.Database
}

const sqlite = globalForDb.__ordeoSqlite ?? new Database(databaseUrl)
sqlite.pragma('journal_mode = WAL')
sqlite.pragma('foreign_keys = ON')

if (process.env.NODE_ENV !== 'production') {
  globalForDb.__ordeoSqlite = sqlite
}

export const db = drizzle(sqlite, { schema })
export { schema }
