import Database from 'better-sqlite3'
import { eq } from 'drizzle-orm'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import { plans } from '../server/db/schema'

const databaseUrl = process.env.DATABASE_URL || './ordeo.db'
const sqlite = new Database(databaseUrl)
const db = drizzle(sqlite)

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

async function main() {
  console.log('🌱 Seeding plans...')

  for (const plan of planSeed) {
    const existing = sqlite
      .prepare('SELECT id FROM plans WHERE code = ?')
      .get(plan.code) as { id: number } | undefined

    if (existing) {
      await db
        .update(plans)
        .set({
          name: plan.name,
          tagline: plan.tagline,
          price: plan.price,
          interval: plan.interval,
          highlighted: plan.highlighted,
          features: plan.features,
        })
        .where(eq(plans.code, plan.code))
      console.log(`  ↻ updated: ${plan.name}`)
    } else {
      await db.insert(plans).values(plan)
      console.log(`  ✔ inserted: ${plan.name}`)
    }
  }

  console.log('✅ Seed selesai.')
  sqlite.close()
}

main().catch((err) => {
  console.error('❌ Seed gagal:', err)
  process.exit(1)
})
