import { eq } from 'drizzle-orm'
import { db } from '~~/server/db'
import { orders, paymentLogs } from '~~/server/db/schema'

/**
 * Dummy webhook Midtrans.
 *
 * Pada produksi, Midtrans mengirim notifikasi transaksi ke endpoint ini.
 * Struktur payload Midtrans:
 *   { order_id, transaction_status, fraud_status, gross_amount, signature_key, ... }
 *
 * Yang perlu ditambahkan saat produksi:
 *   1. Verifikasi signature_key = sha512(order_id + status_code + gross_amount + serverKey)
 *   2. Mapping transaction_status -> status order (settlement/capture => paid, dst.)
 */

interface MidtransNotification {
  order_id?: string
  transaction_status?: string
  fraud_status?: string
  gross_amount?: string
  transaction_id?: string
  signature_key?: string
  status_code?: string
}

function mapStatus(
  transactionStatus?: string,
  fraudStatus?: string,
): 'paid' | 'pending' | 'failed' | 'expired' | 'cancelled' {
  switch (transactionStatus) {
    case 'capture':
      return fraudStatus === 'challenge' ? 'pending' : 'paid'
    case 'settlement':
      return 'paid'
    case 'pending':
      return 'pending'
    case 'deny':
      return 'failed'
    case 'expire':
      return 'expired'
    case 'cancel':
      return 'cancelled'
    default:
      return 'pending'
  }
}

export default defineEventHandler(async (event) => {
  const body = await readBody<MidtransNotification>(event)
  const invoiceNumber = body?.order_id

  if (!invoiceNumber) {
    throw createError({ statusCode: 400, statusMessage: 'order_id wajib ada.' })
  }

  const [order] = await db
    .select()
    .from(orders)
    .where(eq(orders.invoiceNumber, invoiceNumber))
    .limit(1)

  const newStatus = mapStatus(body?.transaction_status, body?.fraud_status)

  if (order) {
    await db
      .update(orders)
      .set({
        status: newStatus,
        paymentReference: body?.transaction_id ?? order.paymentReference,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(orders.id, order.id))
  }

  await db.insert(paymentLogs).values({
    orderId: order?.id,
    invoiceNumber,
    provider: 'midtrans',
    event: 'webhook.notification',
    status: newStatus,
    amount: body?.gross_amount ? Number(body.gross_amount) : undefined,
    payload: body as Record<string, unknown>,
  })

  return { received: true, status: newStatus }
})
