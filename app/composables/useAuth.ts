export interface AuthUser {
  id: number
  name: string
  email: string
  whatsapp: string
  businessName: string
  createdAt: string
}

export const useAuthUser = () => useState<AuthUser | null>('auth-user', () => null)

/**
 * Ambil user saat ini (dipakai di plugin & setelah login/register).
 * Menggunakan useRequestFetch agar cookie ikut terkirim saat SSR.
 */
export async function fetchAuthUser(): Promise<AuthUser | null> {
  const user = useAuthUser()
  const request = useRequestFetch()
  try {
    const data = await request<{ user: AuthUser | null }>('/api/auth/me')
    user.value = data.user
  } catch {
    user.value = null
  }
  return user.value
}

export function useAuth() {
  const user = useAuthUser()

  const isLoggedIn = computed(() => Boolean(user.value))

  async function login(email: string, password: string) {
    const data = await $fetch<{ user: AuthUser }>('/api/auth/login', {
      method: 'POST',
      body: { email, password },
    })
    user.value = data.user
    return data.user
  }

  async function register(payload: {
    name: string
    email: string
    whatsapp: string
    password: string
    businessName: string
  }) {
    const data = await $fetch<{ user: AuthUser }>('/api/auth/register', {
      method: 'POST',
      body: payload,
    })
    user.value = data.user
    return data.user
  }

  async function logout() {
    await $fetch('/api/auth/logout', { method: 'POST' })
    user.value = null
    await navigateTo('/')
  }

  return { user, isLoggedIn, login, register, logout }
}
