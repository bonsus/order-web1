import { eq } from 'drizzle-orm'
import { db } from '~~/server/db'
import { users } from '~~/server/db/schema'

interface ChangePasswordBody {
  currentPassword?: string
  newPassword?: string
}

export default defineEventHandler(async (event) => {
  const authUser = await requireAuthUser(event)
  const body = await readBody<ChangePasswordBody>(event)

  const currentPassword = body?.currentPassword
  const newPassword = body?.newPassword

  if (!currentPassword || !newPassword) {
    throw createError({ statusCode: 400, statusMessage: 'Password lama dan baru wajib diisi.' })
  }
  if (newPassword.length < 8) {
    throw createError({ statusCode: 400, statusMessage: 'Password baru minimal 8 karakter.' })
  }

  const [row] = await db.select().from(users).where(eq(users.id, authUser.id)).limit(1)
  if (!row) {
    throw createError({ statusCode: 404, statusMessage: 'User tidak ditemukan.' })
  }

  const valid = await verifyPassword(currentPassword, row.passwordHash)
  if (!valid) {
    throw createError({ statusCode: 401, statusMessage: 'Password lama salah.' })
  }

  const passwordHash = await hashPassword(newPassword)
  await db.update(users).set({ passwordHash }).where(eq(users.id, authUser.id))

  return { success: true }
})
