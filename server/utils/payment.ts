/**
 * Payment gateway abstraction.
 *
 * Saat ini menggunakan implementasi "dummy" agar checkout dapat berjalan tanpa
 * kredensial gateway. Struktur di bawah sengaja dibuat mirip dengan alur
 * Midtrans Snap sehingga migrasi ke produksi hanya perlu mengganti isi
 * `createDummyTransaction` dengan panggilan ke Midtrans Snap API.
 *
 * Referensi Midtrans Snap:
 *   POST https://app.sandbox.midtrans.com/snap/v1/transactions
 *   body: { transaction_details: { order_id, gross_amount }, customer_details, item_details }
 *   response: { token, redirect_url }
 */

export interface PaymentCustomer {
  name: string
  email: string
  phone: string
}

export interface PaymentItem {
  id: string
  name: string
  price: number
  quantity: number
}

export interface CreateTransactionInput {
  invoiceNumber: string
  amount: number
  customer: PaymentCustomer
  items: PaymentItem[]
}

export interface CreateTransactionResult {
  provider: 'dummy' | 'midtrans'
  reference: string
  /** URL yang dituju browser untuk menyelesaikan pembayaran. */
  redirectUrl: string
  /** Token Snap (kosong pada mode dummy). */
  token?: string
}

/**
 * Dummy transaction — mengembalikan redirect ke halaman success internal.
 * Ganti fungsi ini ketika mengaktifkan Midtrans.
 */
function createDummyTransaction(input: CreateTransactionInput): CreateTransactionResult {
  const reference = `DUMMY-${input.invoiceNumber}`
  return {
    provider: 'dummy',
    reference,
    redirectUrl: `/checkout/success?invoice=${encodeURIComponent(input.invoiceNumber)}`,
  }
}

/**
 * Contoh kerangka integrasi Midtrans Snap (belum aktif).
 * Aktifkan dengan mengisi MIDTRANS_SERVER_KEY lalu panggil di createTransaction.
 */
// async function createMidtransTransaction(
//   input: CreateTransactionInput,
// ): Promise<CreateTransactionResult> {
//   const serverKey = process.env.MIDTRANS_SERVER_KEY as string
//   const isProduction = process.env.MIDTRANS_IS_PRODUCTION === 'true'
//   const baseUrl = isProduction
//     ? 'https://app.midtrans.com/snap/v1/transactions'
//     : 'https://app.sandbox.midtrans.com/snap/v1/transactions'
//   const auth = Buffer.from(`${serverKey}:`).toString('base64')
//
//   const res = await $fetch<{ token: string; redirect_url: string }>(baseUrl, {
//     method: 'POST',
//     headers: {
//       Authorization: `Basic ${auth}`,
//       'Content-Type': 'application/json',
//       Accept: 'application/json',
//     },
//     body: {
//       transaction_details: {
//         order_id: input.invoiceNumber,
//         gross_amount: input.amount,
//       },
//       customer_details: {
//         first_name: input.customer.name,
//         email: input.customer.email,
//         phone: input.customer.phone,
//       },
//       item_details: input.items.map((item) => ({
//         id: item.id,
//         name: item.name,
//         price: item.price,
//         quantity: item.quantity,
//       })),
//     },
//   })
//
//   return {
//     provider: 'midtrans',
//     reference: input.invoiceNumber,
//     redirectUrl: res.redirect_url,
//     token: res.token,
//   }
// }

/**
 * Entry point tunggal untuk membuat transaksi pembayaran.
 */
export async function createTransaction(
  input: CreateTransactionInput,
): Promise<CreateTransactionResult> {
  // const useMidtrans = Boolean(process.env.MIDTRANS_SERVER_KEY)
  // if (useMidtrans) return createMidtransTransaction(input)
  return createDummyTransaction(input)
}

/**
 * Membuat nomor invoice unik, contoh: ORD-20260708-8F3A1B
 */
export function generateInvoiceNumber(): string {
  const now = new Date()
  const y = now.getFullYear()
  const m = String(now.getMonth() + 1).padStart(2, '0')
  const d = String(now.getDate()).padStart(2, '0')
  const random = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `ORD-${y}${m}${d}-${random}`
}
