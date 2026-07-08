<script setup lang="ts">
useHead({ title: 'Kontak — Ordeo' })

const form = reactive({ name: '', email: '', subject: '', message: '' })
const loading = ref(false)
const error = ref('')
const success = ref(false)

const channels = [
  { icon: 'globe' as const, label: 'Email', value: 'support@ordeo.id', href: 'mailto:support@ordeo.id' },
  { icon: 'cod' as const, label: 'Sales', value: 'sales@ordeo.id', href: 'mailto:sales@ordeo.id' },
  { icon: 'bolt' as const, label: 'WhatsApp', value: '+62 856-5555-0423', href: 'https://wa.me/6285655550423' },
]

async function onSubmit() {
  error.value = ''
  success.value = false
  loading.value = true
  try {
    await $fetch('/api/contact', { method: 'POST', body: { ...form } })
    success.value = true
    form.name = ''
    form.email = ''
    form.subject = ''
    form.message = ''
  } catch (e: any) {
    error.value = e?.data?.statusMessage || e?.statusMessage || 'Gagal mengirim pesan. Coba lagi.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="bg-radial-brand">
      <div class="container-x py-16 sm:py-20">
        <div class="mx-auto max-w-2xl text-center">
          <span class="eyebrow">Hubungi Kami</span>
          <h1 class="h1 mt-5 text-balance">Mari bicara tentang bisnis Anda</h1>
          <p class="lead mt-4 text-balance">
            Punya pertanyaan tentang produk, harga, atau butuh bantuan onboarding? Tim kami siap
            membantu.
          </p>
        </div>
      </div>
    </section>

    <section class="pb-24">
      <div class="container-x">
        <div class="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_1.4fr]">
          <!-- Info -->
          <div class="space-y-4">
            <a
              v-for="ch in channels"
              :key="ch.label"
              :href="ch.href"
              class="flex items-center gap-4 rounded-2xl border border-ink-200 bg-white p-5 shadow-soft transition hover:border-brand-200 hover:shadow-glow"
            >
              <span class="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                <AppIcon :name="ch.icon" class="h-5 w-5" />
              </span>
              <span>
                <span class="block text-xs font-semibold uppercase tracking-wide text-ink-500">{{ ch.label }}</span>
                <span class="block text-sm font-semibold text-ink-900">{{ ch.value }}</span>
              </span>
            </a>

            <div class="rounded-2xl border border-ink-200 bg-ink-950 p-6 text-white">
              <h3 class="text-sm font-semibold uppercase tracking-wide text-brand-300">Kantor</h3>
              <p class="mt-3 text-sm leading-relaxed text-ink-300">
                PT Ordeo Mitra Digital<br />
                Jalan Limusnunggal, Cibeureum, Kota Sukabumi, Jawa Barat 43165
              </p>
              <p class="mt-4 flex items-center gap-2 text-sm text-ink-400">
                <AppIcon name="clock" class="h-4 w-4" />
                Senin–Jumat, 09.00–18.00 WIB
              </p>
            </div>
          </div>

          <!-- Form -->
          <div class="rounded-3xl border border-ink-200 bg-white p-8 shadow-glow">
            <h2 class="text-lg font-bold text-ink-900">Kirim pesan</h2>
            <p class="mt-1 text-sm text-ink-500">Kami biasanya membalas dalam 1 hari kerja.</p>

            <div v-if="success" class="mt-5 flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              <AppIcon name="check" class="mt-0.5 h-4 w-4 flex-shrink-0" />
              Terima kasih! Pesan Anda sudah terkirim. Tim kami akan segera menghubungi Anda.
            </div>

            <form class="mt-6 space-y-4" @submit.prevent="onSubmit">
              <div class="grid gap-4 sm:grid-cols-2">
                <div>
                  <label class="label" for="name">Nama lengkap</label>
                  <input id="name" v-model="form.name" class="input" type="text" placeholder="Nama Anda" required />
                </div>
                <div>
                  <label class="label" for="email">Email</label>
                  <input id="email" v-model="form.email" class="input" type="email" placeholder="nama@email.com" required />
                </div>
              </div>
              <div>
                <label class="label" for="subject">Subjek</label>
                <input id="subject" v-model="form.subject" class="input" type="text" placeholder="Terkait apa?" />
              </div>
              <div>
                <label class="label" for="message">Pesan</label>
                <textarea id="message" v-model="form.message" class="input" rows="5" placeholder="Tulis pesan Anda di sini..." required />
              </div>

              <p v-if="error" class="field-error">{{ error }}</p>

              <button type="submit" class="btn-primary btn-lg w-full" :disabled="loading">
                {{ loading ? 'Mengirim...' : 'Kirim Pesan' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
