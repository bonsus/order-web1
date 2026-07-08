<script setup lang="ts">
useHead({ title: 'Masuk — Ordeo' })

const { login } = useAuth()
const route = useRoute()

const form = reactive({ email: '', password: '' })
const loading = ref(false)
const error = ref('')

async function onSubmit() {
  error.value = ''
  loading.value = true
  try {
    await login(form.email, form.password)
    const redirect = (route.query.redirect as string) || '/pricing'
    await navigateTo(redirect)
  } catch (e: any) {
    error.value = e?.data?.statusMessage || e?.statusMessage || 'Email atau password salah.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="bg-radial-brand">
    <div class="container-x py-20">
      <div class="mx-auto max-w-md">
        <div class="text-center">
          <div class="flex justify-center">
            <AppLogo />
          </div>
          <h1 class="mt-6 text-2xl font-bold text-ink-900">Selamat datang kembali</h1>
          <p class="mt-2 text-sm text-ink-500">Masuk untuk mengelola bisnis Anda di Ordeo.</p>
        </div>

        <div class="mt-8 rounded-3xl border border-ink-200 bg-white p-8 shadow-glow">
          <form class="space-y-4" @submit.prevent="onSubmit">
            <div>
              <label class="label" for="email">Email</label>
              <input id="email" v-model="form.email" class="input" type="email" placeholder="nama@email.com" required />
            </div>
            <div>
              <label class="label" for="password">Password</label>
              <input id="password" v-model="form.password" class="input" type="password" placeholder="Password Anda" required />
            </div>

            <p v-if="error" class="field-error">{{ error }}</p>

            <button type="submit" class="btn-primary w-full" :disabled="loading">
              {{ loading ? 'Memproses...' : 'Masuk' }}
            </button>
          </form>
        </div>

        <p class="mt-6 text-center text-sm text-ink-500">
          Belum punya akun?
          <NuxtLink to="/register" class="font-semibold text-brand-600 hover:underline">Daftar gratis</NuxtLink>
        </p>
      </div>
    </div>
  </section>
</template>
