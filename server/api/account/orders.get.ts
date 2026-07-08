import { desc, eq } from 'drizzle-orm'
import { db } from '~~/server/db'
import { orders } from '~~/server/db/schema'

export default defineEventHandler(async (event) => {
  const user = await requireAuthUser(event)

  const rows = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, user.id))
    .orderBy(desc(orders.createdAt))

  return { orders: rows }
})
