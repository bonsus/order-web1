interface ContactBody {
  name?: string
  email?: string
  subject?: string
  message?: string
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default defineEventHandler(async (event) => {
  const body = await readBody<ContactBody>(event)

  const name = body?.name?.trim()
  const email = body?.email?.trim()
  const subject = body?.subject?.trim()
  const message = body?.message?.trim()

  if (!name || !email || !message) {
    throw createError({ statusCode: 400, statusMessage: 'Nama, email, dan pesan wajib diisi.' })
  }
  if (!emailRegex.test(email)) {
    throw createError({ statusCode: 400, statusMessage: 'Format email tidak valid.' })
  }

  // Untuk sementara pesan hanya dicatat di log server.
  // Di produksi, integrasikan dengan email/CRM (mis. kirim ke support@ordeo.id).
  console.info('[contact] pesan baru:', {
    name,
    email,
    subject: subject || '(tanpa subjek)',
    message,
    at: new Date().toISOString(),
  })

  return { success: true }
})
