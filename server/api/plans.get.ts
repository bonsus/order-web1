import { asc } from 'drizzle-orm'
import { db } from '~~/server/db'
import { plans } from '~~/server/db/schema'

export default defineEventHandler(async () => {
  const rows = await db.select().from(plans).orderBy(asc(plans.price))
  return { plans: rows }
})
