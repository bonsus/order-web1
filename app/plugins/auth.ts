/**
 * Ambil sesi user sekali saat aplikasi dijalankan (SSR-aware).
 */
export default defineNuxtPlugin(async () => {
  await fetchAuthUser()
})
