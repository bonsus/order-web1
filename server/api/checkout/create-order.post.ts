import { eq } from 'drizzle-orm'
import { db } from '~~/server/db'
import { businesses, orders, paymentLogs, plans } from '~~/server/db/schema'

interface CreateOrderBody {
  planCode?: string
  paymentMethod?: string
  business?: {
    name?: string
    type?: string
    address?: string
    city?: string
    province?: string
    postalCode?: string
  }
}

const ALLOWED_PAYMENT_METHODS = ['midtrans', 'bank_transfer'] as const

export default defineEventHandler(async (event) => {
  const user = await requireAuthUser(event)
  const body = await readBody<CreateOrderBody>(event)

  const planCode = body?.planCode?.trim()
  const b = body?.business

  // Metode pembayaran, default: midtrans
  const paymentMethod = ALLOWED_PAYMENT_METHODS.includes(
    (body?.paymentMethod ?? '') as (typeof ALLOWED_PAYMENT_METHODS)[number],
  )
    ? (body!.paymentMethod as string)
    : 'midtrans'

  if (!planCode) {
    throw createError({ statusCode: 400, statusMessage: 'Paket wajib dipilih.' })
  }
  if (!b?.name || !b?.type || !b?.address || !b?.city || !b?.province || !b?.postalCode) {
    throw createError({ statusCode: 400, statusMessage: 'Lengkapi semua data bisnis.' })
  }

  const [plan] = await db.select().from(plans).where(eq(plans.code, planCode)).limit(1)
  if (!plan) {
    throw createError({ statusCode: 404, statusMessage: 'Paket tidak ditemukan.' })
  }

  // Simpan / perbarui profil bisnis
  const [business] = await db
    .insert(businesses)
    .values({
      userId: user.id,
      name: b.name.trim(),
      type: b.type.trim(),
      address: b.address.trim(),
      city: b.city.trim(),
      province: b.province.trim(),
      postalCode: b.postalCode.trim(),
    })
    .returning()

  const invoiceNumber = generateInvoiceNumber()

  const [order] = await db
    .insert(orders)
    .values({
      invoiceNumber,
      userId: user.id,
      businessId: business?.id,
      planCode: plan.code,
      planName: plan.name,
      amount: plan.price,
      status: 'pending',
      paymentProvider: paymentMethod,
    })
    .returning()

  if (!order) {
    throw createError({ statusCode: 500, statusMessage: 'Gagal membuat order.' })
  }

  // Buat transaksi pembayaran (dummy — siap diganti Midtrans)
  const transaction = await createTransaction({
    invoiceNumber,
    amount: plan.price,
    customer: {
      name: user.name,
      email: user.email,
      phone: user.whatsapp,
    },
    items: [
      {
        id: plan.code,
        name: `Ordeo ${plan.name} (${plan.interval})`,
        price: plan.price,
        quantity: 1,
      },
    ],
  })

  await db
    .update(orders)
    .set({
      paymentReference: transaction.reference,
      updatedAt: new Date().toISOString(),
    })
    .where(eq(orders.id, order.id))

  await db.insert(paymentLogs).values({
    orderId: order.id,
    invoiceNumber,
    provider: paymentMethod,
    event: 'transaction.created',
    status: 'pending',
    amount: plan.price,
    payload: {
      method: paymentMethod,
      gateway: transaction.provider,
      reference: transaction.reference,
      redirectUrl: transaction.redirectUrl,
    },
  })

  return {
    invoiceNumber,
    orderId: order.id,
    redirectUrl: transaction.redirectUrl,
    token: transaction.token ?? null,
  }
})
