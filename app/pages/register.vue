<script setup lang="ts">
useHead({ title: 'Daftar — Ordeo' })

const { register } = useAuth()
const route = useRoute()

const form = reactive({
  name: '',
  email: '',
  whatsapp: '',
  businessName: '',
  password: '',
})
const loading = ref(false)
const error = ref('')

const planQuery = computed(() => (route.query.plan as string) || '')

async function onSubmit() {
  error.value = ''
  loading.value = true
  try {
    await register({
      name: form.name,
      email: form.email,
      whatsapp: form.whatsapp,
      businessName: form.businessName,
      password: form.password,
    })
    const target = planQuery.value ? `/checkout?plan=${planQuery.value}` : '/checkout'
    await navigateTo(target)
  } catch (e: any) {
    error.value = e?.data?.statusMessage || e?.statusMessage || 'Gagal mendaftar. Coba lagi.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="bg-radial-brand">
    <div class="container-x py-16">
      <div class="mx-auto grid max-w-5xl overflow-hidden rounded-3xl border border-ink-200 bg-white shadow-glow lg:grid-cols-2">
        <!-- Brand side -->
        <div class="relative hidden flex-col justify-between bg-ink-950 p-10 text-white lg:flex">
          <div class="pointer-events-none absolute inset-0 bg-grid-slate opacity-10" />
          <AppLogo variant="light" />
          <div class="relative">
            <h2 class="text-3xl font-extrabold leading-tight">
              Mulai kelola bisnis Anda dengan lebih rapi.
            </h2>
            <p class="mt-4 text-ink-300">
              Satu akun untuk order, stok, gudang, COD, dan laporan keuangan. Tanpa ribet.
            </p>
            <ul class="mt-8 space-y-3 text-sm text-ink-200">
              <li v-for="t in ['Setup dalam hitungan menit', 'Tanpa kontrak jangka panjang', 'Dukungan tim yang responsif']" :key="t" class="flex items-center gap-3">
                <span class="flex h-5 w-5 items-center justify-center rounded-full bg-brand-500 text-white">
                  <AppIcon name="check" class="h-3 w-3" />
                </span>
                {{ t }}
              </li>
            </ul>
          </div>
          <p class="relative text-sm text-ink-500">Sudah punya akun?
            <NuxtLink to="/login" class="font-semibold text-white hover:underline">Masuk di sini</NuxtLink>
          </p>
        </div>

        <!-- Form side -->
        <div class="p-8 sm:p-10">
          <div class="lg:hidden">
            <AppLogo />
          </div>
          <h1 class="mt-6 text-2xl font-bold text-ink-900 lg:mt-0">Buat akun Ordeo</h1>
          <p class="mt-2 text-sm text-ink-500">
            Isi data di bawah untuk memulai. Gratis untuk mendaftar.
          </p>

          <div v-if="planQuery" class="mt-5 rounded-xl border border-brand-100 bg-brand-50 px-4 py-3 text-sm text-brand-700">
            Anda memilih paket <strong class="capitalize">{{ planQuery }}</strong>. Lanjutkan pendaftaran untuk checkout.
          </div>

          <form class="mt-6 space-y-4" @submit.prevent="onSubmit">
            <div>
              <label class="label" for="name">Nama lengkap</label>
              <input id="name" v-model="form.name" class="input" type="text" placeholder="Nama Anda" required />
            </div>
            <div class="grid gap-4 sm:grid-cols-2">
              <div>
                <label class="label" for="email">Email</label>
                <input id="email" v-model="form.email" class="input" type="email" placeholder="nama@email.com" required />
              </div>
              <div>
                <label class="label" for="whatsapp">No. WhatsApp</label>
                <input id="whatsapp" v-model="form.whatsapp" class="input" type="tel" placeholder="08xxxxxxxxxx" required />
              </div>
            </div>
            <div>
              <label class="label" for="businessName">Nama bisnis</label>
              <input id="businessName" v-model="form.businessName" class="input" type="text" placeholder="Toko / brand Anda" required />
            </div>
            <div>
              <label class="label" for="password">Password</label>
              <input id="password" v-model="form.password" class="input" type="password" placeholder="Minimal 8 karakter" minlength="8" required />
            </div>

            <p v-if="error" class="field-error">{{ error }}</p>

            <button type="submit" class="btn-primary w-full" :disabled="loading">
              {{ loading ? 'Memproses...' : 'Daftar Sekarang' }}
            </button>
            <p class="text-center text-xs text-ink-500">
              Dengan mendaftar, Anda menyetujui
              <NuxtLink to="/terms" class="font-medium text-brand-600 hover:underline">Syarat</NuxtLink>
              &amp;
              <NuxtLink to="/privacy" class="font-medium text-brand-600 hover:underline">Kebijakan Privasi</NuxtLink>.
            </p>
          </form>

          <p class="mt-6 text-center text-sm text-ink-500 lg:hidden">
            Sudah punya akun?
            <NuxtLink to="/login" class="font-semibold text-brand-600 hover:underline">Masuk</NuxtLink>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
