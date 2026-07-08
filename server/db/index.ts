import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import * as schema from './schema'

const databaseUrl = process.env.DATABASE_URL || './ordeo.db'

// Reuse a single connection across HMR reloads / requests.
const globalForDb = globalThis as unknown as {
  __ordeoSqlite?: Database.Database
  __ordeoInitialized?: boolean
}

const sqlite = globalForDb.__ordeoSqlite ?? new Database(databaseUrl)
sqlite.pragma('journal_mode = WAL')
sqlite.pragma('foreign_keys = ON')

if (process.env.NODE_ENV !== 'production') {
  globalForDb.__ordeoSqlite = sqlite
}

/**
 * Buat tabel bila belum ada dan isi data paket awal.
 *
 * Ini membuat aplikasi bisa langsung berjalan di server (VPS) tanpa perlu
 * menjalankan `drizzle-kit push` atau `tsx scripts/seed.ts` secara manual.
 */
function initializeDatabase(database: Database.Database): void {
  if (globalForDb.__ordeoInitialized) return

  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
      name text NOT NULL,
      email text NOT NULL,
      whatsapp text NOT NULL,
      password_hash text NOT NULL,
      business_name text NOT NULL,
      created_at text DEFAULT (datetime('now')) NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS users_email_idx ON users (email);

    CREATE TABLE IF NOT EXISTS businesses (
      id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
      user_id integer NOT NULL,
      name text NOT NULL,
      type text NOT NULL,
      address text NOT NULL,
      city text NOT NULL,
      province text NOT NULL,
      postal_code text NOT NULL,
      created_at text DEFAULT (datetime('now')) NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS plans (
      id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
      code text NOT NULL,
      name text NOT NULL,
      tagline text NOT NULL,
      price integer NOT NULL,
      interval text DEFAULT 'month' NOT NULL,
      highlighted integer DEFAULT false NOT NULL,
      features text NOT NULL,
      created_at text DEFAULT (datetime('now')) NOT NULL
    );
    CREATE UNIQUE INDEX IF NOT EXISTS plans_code_idx ON plans (code);

    CREATE TABLE IF NOT EXISTS orders (
      id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
      invoice_number text NOT NULL,
      user_id integer NOT NULL,
      business_id integer,
      plan_code text NOT NULL,
      plan_name text NOT NULL,
      amount integer NOT NULL,
      currency text DEFAULT 'IDR' NOT NULL,
      status text DEFAULT 'pending' NOT NULL,
      payment_provider text DEFAULT 'dummy' NOT NULL,
      payment_reference text,
      created_at text DEFAULT (datetime('now')) NOT NULL,
      updated_at text DEFAULT (datetime('now')) NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (business_id) REFERENCES businesses(id)
    );
    CREATE UNIQUE INDEX IF NOT EXISTS orders_invoice_idx ON orders (invoice_number);

    CREATE TABLE IF NOT EXISTS payment_logs (
      id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
      order_id integer,
      invoice_number text,
      provider text DEFAULT 'dummy' NOT NULL,
      event text NOT NULL,
      status text NOT NULL,
      amount real,
      payload text,
      created_at text DEFAULT (datetime('now')) NOT NULL,
      FOREIGN KEY (order_id) REFERENCES orders(id)
    );
  `)

  seedPlans(database)
  globalForDb.__ordeoInitialized = true
}

function seedPlans(database: Database.Database): void {
  const { count } = database.prepare('SELECT COUNT(*) as count FROM plans').get() as {
    count: number
  }
  if (count > 0) return

  const insert = database.prepare(
    `INSERT INTO plans (code, name, tagline, price, interval, highlighted, features)
     VALUES (@code, @name, @tagline, @price, @interval, @highlighted, @features)`,
  )

  const insertMany = database.transaction((rows: typeof planSeed) => {
    for (const plan of rows) {
      insert.run({
        code: plan.code,
        name: plan.name,
        tagline: plan.tagline,
        price: plan.price,
        interval: plan.interval,
        highlighted: plan.highlighted ? 1 : 0,
        features: JSON.stringify(plan.features),
      })
    }
  })

  insertMany(planSeed)
}

const planSeed = [
  {
    code: 'starter',
    name: 'Starter',
    tagline: 'Untuk seller yang baru mulai merapikan operasional.',
    price: 299000,
    interval: 'month',
    highlighted: false,
    features: [
      'Hingga 500 order / bulan',
      '2 channel marketplace',
      '1 gudang',
      'Order & inventory management',
      'Laporan penjualan dasar',
      'Dukungan email',
    ],
  },
  {
    code: 'growth',
    name: 'Growth',
    tagline: 'Untuk bisnis yang sedang scaling ke banyak channel.',
    price: 799000,
    interval: 'month',
    highlighted: true,
    features: [
      'Hingga 5.000 order / bulan',
      'Marketplace tanpa batas',
      'Hingga 3 gudang',
      'FIFO & stok multi-gudang',
      'Rekonsiliasi COD & ongkir',
      'Analytics & finance report',
      'Dukungan prioritas (chat)',
    ],
  },
  {
    code: 'business',
    name: 'Business',
    tagline: 'Untuk brand & distributor dengan volume tinggi.',
    price: 1499000,
    interval: 'month',
    highlighted: false,
    features: [
      'Order tanpa batas',
      'Marketplace & channel tanpa batas',
      'Gudang tanpa batas',
      'Role & permission tim',
      'API & webhook integration',
      'Rekonsiliasi otomatis multi-kurir',
      'Dedicated account manager',
      'SLA & onboarding khusus',
    ],
  },
]

initializeDatabase(sqlite)

export const db = drizzle(sqlite, { schema })
export { schema }

