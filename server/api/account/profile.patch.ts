import { eq } from 'drizzle-orm'
import { db } from '~~/server/db'
import { users } from '~~/server/db/schema'

interface UpdateProfileBody {
  name?: string
  whatsapp?: string
  businessName?: string
}

export default defineEventHandler(async (event) => {
  const authUser = await requireAuthUser(event)
  const body = await readBody<UpdateProfileBody>(event)

  const name = body?.name?.trim()
  const whatsapp = body?.whatsapp?.trim()
  const businessName = body?.businessName?.trim()

  if (!name || !whatsapp || !businessName) {
    throw createError({ statusCode: 400, statusMessage: 'Nama, WhatsApp, dan nama bisnis wajib diisi.' })
  }

  const [updated] = await db
    .update(users)
    .set({ name, whatsapp, businessName })
    .where(eq(users.id, authUser.id))
    .returning()

  if (!updated) {
    throw createError({ statusCode: 500, statusMessage: 'Gagal memperbarui profil.' })
  }

  return { user: toSafeUser(updated) }
})
