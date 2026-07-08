import type { H3Event } from 'h3'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { eq } from 'drizzle-orm'
import { db } from '../db'
import { users } from '../db/schema'

const COOKIE_NAME = 'ordeo_token'
const TOKEN_TTL_SECONDS = 60 * 60 * 24 * 7 // 7 days

export interface TokenPayload {
  sub: number
  email: string
}

export interface SafeUser {
  id: number
  name: string
  email: string
  whatsapp: string
  businessName: string
  createdAt: string
}

function getSecret(): string {
  return useRuntimeConfig().jwtSecret
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export function signToken(payload: TokenPayload): string {
  return jwt.sign(payload, getSecret(), { expiresIn: TOKEN_TTL_SECONDS })
}

export function setAuthCookie(event: H3Event, token: string): void {
  setCookie(event, COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: TOKEN_TTL_SECONDS,
  })
}

export function clearAuthCookie(event: H3Event): void {
  deleteCookie(event, COOKIE_NAME, { path: '/' })
}

export function toSafeUser(row: typeof users.$inferSelect): SafeUser {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    whatsapp: row.whatsapp,
    businessName: row.businessName,
    createdAt: row.createdAt,
  }
}

/**
 * Returns the authenticated user for the request, or null when not signed in.
 */
export async function getAuthUser(event: H3Event): Promise<SafeUser | null> {
  const token = getCookie(event, COOKIE_NAME)
  if (!token) return null

  try {
    const decoded = jwt.verify(token, getSecret()) as TokenPayload
    const [row] = await db.select().from(users).where(eq(users.id, decoded.sub)).limit(1)
    if (!row) return null
    return toSafeUser(row)
  } catch {
    return null
  }
}

/**
 * Same as getAuthUser but throws a 401 when unauthenticated.
 */
export async function requireAuthUser(event: H3Event): Promise<SafeUser> {
  const user = await getAuthUser(event)
  if (!user) {
    throw createError({ statusCode: 401, statusMessage: 'Anda harus login terlebih dahulu.' })
  }
  return user
}
