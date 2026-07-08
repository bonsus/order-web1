import { sql } from 'drizzle-orm'
import { integer, real, sqliteTable, text, uniqueIndex } from 'drizzle-orm/sqlite-core'

/**
 * Users — akun pemilik bisnis yang mendaftar ke Ordeo.
 */
export const users = sqliteTable(
  'users',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    email: text('email').notNull(),
    whatsapp: text('whatsapp').notNull(),
    passwordHash: text('password_hash').notNull(),
    businessName: text('business_name').notNull(),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`),
  },
  (table) => ({
    emailIdx: uniqueIndex('users_email_idx').on(table.email),
  }),
)

/**
 * Businesses — profil bisnis lengkap yang diisi saat checkout.
 */
export const businesses = sqliteTable('businesses', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id')
    .notNull()
    .references(() => users.id),
  name: text('name').notNull(),
  type: text('type').notNull(),
  address: text('address').notNull(),
  city: text('city').notNull(),
  province: text('province').notNull(),
  postalCode: text('postal_code').notNull(),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(datetime('now'))`),
})

/**
 * Plans — paket langganan Ordeo (di-seed).
 */
export const plans = sqliteTable(
  'plans',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    code: text('code').notNull(),
    name: text('name').notNull(),
    tagline: text('tagline').notNull(),
    price: integer('price').notNull(),
    interval: text('interval').notNull().default('month'),
    highlighted: integer('highlighted', { mode: 'boolean' }).notNull().default(false),
    features: text('features', { mode: 'json' }).notNull().$type<string[]>(),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`),
  },
  (table) => ({
    codeIdx: uniqueIndex('plans_code_idx').on(table.code),
  }),
)

/**
 * Orders — pesanan langganan yang dibuat saat checkout.
 */
export const orders = sqliteTable(
  'orders',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    invoiceNumber: text('invoice_number').notNull(),
    userId: integer('user_id')
      .notNull()
      .references(() => users.id),
    businessId: integer('business_id').references(() => businesses.id),
    planCode: text('plan_code').notNull(),
    planName: text('plan_name').notNull(),
    amount: integer('amount').notNull(),
    currency: text('currency').notNull().default('IDR'),
    status: text('status', {
      enum: ['pending', 'paid', 'failed', 'expired', 'cancelled'],
    })
      .notNull()
      .default('pending'),
    paymentProvider: text('payment_provider').notNull().default('dummy'),
    paymentReference: text('payment_reference'),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(datetime('now'))`),
  },
  (table) => ({
    invoiceIdx: uniqueIndex('orders_invoice_idx').on(table.invoiceNumber),
  }),
)

/**
 * Payment logs — jejak audit callback/webhook pembayaran.
 */
export const paymentLogs = sqliteTable('payment_logs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  orderId: integer('order_id').references(() => orders.id),
  invoiceNumber: text('invoice_number'),
  provider: text('provider').notNull().default('dummy'),
  event: text('event').notNull(),
  status: text('status').notNull(),
  amount: real('amount'),
  payload: text('payload', { mode: 'json' }),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(datetime('now'))`),
})

export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert
export type Business = typeof businesses.$inferSelect
export type Plan = typeof plans.$inferSelect
export type Order = typeof orders.$inferSelect
export type PaymentLog = typeof paymentLogs.$inferSelect
