import { and, eq } from 'drizzle-orm'
import { db } from '~~/server/db'
import { orders } from '~~/server/db/schema'

export default defineEventHandler(async (event) => {
  const user = await requireAuthUser(event)
  const id = getRouterParam(event, 'id')

  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'ID order tidak valid.' })
  }

  // `id` dapat berupa nomor id numerik atau nomor invoice.
  const isNumeric = /^\d+$/.test(id)
  const condition = isNumeric
    ? and(eq(orders.id, Number(id)), eq(orders.userId, user.id))
    : and(eq(orders.invoiceNumber, id), eq(orders.userId, user.id))

  const [order] = await db.select().from(orders).where(condition).limit(1)

  if (!order) {
    throw createError({ statusCode: 404, statusMessage: 'Order tidak ditemukan.' })
  }

  return { order }
})
