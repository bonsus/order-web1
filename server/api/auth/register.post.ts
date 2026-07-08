import { eq } from 'drizzle-orm'
import { db } from '~~/server/db'
import { users } from '~~/server/db/schema'

interface RegisterBody {
  name?: string
  email?: string
  whatsapp?: string
  password?: string
  businessName?: string
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default defineEventHandler(async (event) => {
  const body = await readBody<RegisterBody>(event)

  const name = body?.name?.trim()
  const email = body?.email?.trim().toLowerCase()
  const whatsapp = body?.whatsapp?.trim()
  const password = body?.password
  const businessName = body?.businessName?.trim()

  if (!name || !email || !whatsapp || !password || !businessName) {
    throw createError({ statusCode: 400, statusMessage: 'Semua field wajib diisi.' })
  }
  if (!emailRegex.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Format email tidak valid.' })
  }
  if (password.length < 8) {
    throw createError({ statusCode: 400, statusMessage: 'Password minimal 8 karakter.' })
  }

  const [existing] = await db.select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1)
  if (existing) {
    throw createError({ statusCode: 409, statusMessage: 'Email sudah terdaftar. Silakan login.' })
  }

  const passwordHash = await hashPassword(password)

  const [created] = await db
    .insert(users)
    .values({ name, email, whatsapp, passwordHash, businessName })
    .returning()

  if (!created) {
    throw createError({ statusCode: 500, statusMessage: 'Gagal membuat akun.' })
  }

  const token = signToken({ sub: created.id, email: created.email })
  setAuthCookie(event, token)

  return { user: toSafeUser(created) }
})
