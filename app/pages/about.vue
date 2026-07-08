<script setup lang="ts">
useHead({ title: 'Tentang Ordeo — ERP & Omnichannel Platform' })

const values = [
  {
    icon: 'bolt' as const,
    title: 'Fokus pada dampak',
    description:
      'Setiap fitur kami rancang untuk menyelesaikan masalah nyata seller: hemat waktu, kurangi selisih, dan percepat pertumbuhan.',
  },
  {
    icon: 'shield' as const,
    title: 'Dapat diandalkan',
    description:
      'Sistem yang stabil dan aman menjadi fondasi. Data bisnis Anda kami jaga dengan standar keamanan yang tinggi.',
  },
  {
    icon: 'users' as const,
    title: 'Berpihak pada pengguna',
    description:
      'Kami membangun bersama komunitas seller. Masukan Anda langsung membentuk arah pengembangan produk.',
  },
  {
    icon: 'sync' as const,
    title: 'Terus berinovasi',
    description:
      'Lanskap omnichannel bergerak cepat. Kami berkomitmen menghadirkan pembaruan yang relevan secara berkala.',
  },
]

const milestones = [
  { year: '2023', title: 'Ordeo lahir', description: 'Berawal dari keluhan seller soal selisih dana COD dan stok yang berantakan.' },
  { year: '2024', title: 'Integrasi multi-marketplace', description: 'Menghubungkan Shopee, Tokopedia, TikTok Shop, dan Lazada dalam satu dashboard.' },
  { year: '2025', title: 'Modul FIFO & rekonsiliasi', description: 'Meluncurkan perhitungan HPP berbasis FIFO dan rekonsiliasi COD otomatis.' },
  { year: '2026', title: '2.500+ seller aktif', description: 'Dipercaya ribuan seller untuk memproses jutaan order setiap tahun.' },
]

const team = [
  { name: 'Arif Santoso', role: 'CEO & Co-founder', initials: 'AS' },
  { name: 'Nadia Larasati', role: 'CPO & Co-founder', initials: 'NL' },
  { name: 'Bagas Prasetyo', role: 'CTO', initials: 'BP' },
  { name: 'Dewi Anggraini', role: 'Head of Customer Success', initials: 'DA' },
]
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="bg-radial-brand">
      <div class="container-x py-16 sm:py-20">
        <div class="mx-auto max-w-3xl text-center">
          <span class="eyebrow">Tentang Ordeo</span>
          <h1 class="h1 mt-5 text-balance">
            Kami membangun sistem operasi untuk <span class="gradient-text">seller Indonesia</span>
          </h1>
          <p class="lead mt-6 text-balance">
            Ordeo lahir dari satu keyakinan sederhana: seller seharusnya fokus menumbuhkan bisnis,
            bukan tenggelam dalam pekerjaan operasional yang berulang. Kami menyatukan order, stok,
            gudang, pembayaran, dan laporan ke dalam satu platform yang rapi.
          </p>
        </div>
      </div>
    </section>

    <!-- Stats -->
    <section class="border-y border-ink-100 bg-ink-50/50">
      <div class="container-x py-12">
        <div class="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div v-for="s in stats" :key="s.label" class="text-center">
            <p class="text-3xl font-extrabold text-ink-900 sm:text-4xl">{{ s.value }}</p>
            <p class="mt-1 text-sm text-ink-500">{{ s.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission -->
    <section class="section">
      <div class="container-x">
        <div class="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span class="eyebrow">Misi kami</span>
            <h2 class="h2 mt-5">Menyederhanakan operasional, mempercepat pertumbuhan</h2>
            <p class="mt-4 text-base leading-relaxed text-ink-600">
              Banyak seller hebat terhambat bukan karena produknya, melainkan karena operasional
              yang berantakan — order tercecer, stok tidak sinkron, dan dana COD yang sulit
              dilacak. Ordeo hadir untuk menghapus hambatan itu.
            </p>
            <p class="mt-4 text-base leading-relaxed text-ink-600">
              Dengan satu sistem terpadu, kami membantu tim Anda bekerja lebih cepat, membuat
              keputusan berbasis data, dan tumbuh tanpa kekhawatiran soal kerumitan back-office.
            </p>
            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <NuxtLink to="/register" class="btn-primary">Mulai Sekarang</NuxtLink>
              <NuxtLink to="/contact" class="btn-secondary">Hubungi Kami</NuxtLink>
            </div>
          </div>
          <div class="rounded-3xl border border-ink-200 bg-white p-8 shadow-soft">
            <div class="space-y-4">
              <div
                v-for="point in [
                  'Satu dashboard untuk semua channel penjualan',
                  'Stok akurat dengan metode FIFO',
                  'Rekonsiliasi COD & ongkir otomatis',
                  'Laporan keuangan real-time',
                ]"
                :key="point"
                class="flex items-start gap-3 rounded-xl border border-ink-100 bg-ink-50/60 p-4"
              >
                <span class="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-600 text-white">
                  <AppIcon name="check" class="h-3.5 w-3.5" />
                </span>
                <span class="text-sm font-medium text-ink-800">{{ point }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Values -->
    <section class="section bg-ink-50/50">
      <div class="container-x">
        <div class="mx-auto max-w-2xl text-center">
          <span class="eyebrow">Nilai kami</span>
          <h2 class="h2 mt-5">Prinsip yang memandu setiap keputusan</h2>
        </div>
        <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="value in values" :key="value.title" class="card card-hover">
            <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <AppIcon :name="value.icon" class="h-6 w-6" />
            </div>
            <h3 class="mt-5 text-lg font-bold text-ink-900">{{ value.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-ink-600">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="section">
      <div class="container-x">
        <div class="mx-auto max-w-2xl text-center">
          <span class="eyebrow">Perjalanan kami</span>
          <h2 class="h2 mt-5">Dari ide menjadi platform tepercaya</h2>
        </div>
        <div class="mx-auto mt-14 max-w-3xl">
          <div class="space-y-8">
            <div v-for="m in milestones" :key="m.year" class="flex gap-6">
              <div class="flex flex-col items-center">
                <span class="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                  {{ m.year }}
                </span>
                <span class="mt-2 w-px flex-1 bg-ink-200 last:hidden" />
              </div>
              <div class="pb-2">
                <h3 class="text-lg font-bold text-ink-900">{{ m.title }}</h3>
                <p class="mt-1 text-sm leading-relaxed text-ink-600">{{ m.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Team -->
    <!-- <section class="section bg-ink-50/50">
      <div class="container-x">
        <div class="mx-auto max-w-2xl text-center">
          <span class="eyebrow">Tim kami</span>
          <h2 class="h2 mt-5">Orang-orang di balik Ordeo</h2>
          <p class="lead mt-4">
            Tim yang menggabungkan pengalaman di bidang e-commerce, logistik, dan teknologi.
          </p>
        </div>
        <div class="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="member in team" :key="member.name" class="card text-center">
            <span class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-violet-600 text-lg font-bold text-white">
              {{ member.initials }}
            </span>
            <h3 class="mt-4 text-base font-bold text-ink-900">{{ member.name }}</h3>
            <p class="mt-1 text-sm text-ink-500">{{ member.role }}</p>
          </div>
        </div>
      </div>
    </section> -->

    <!-- CTA -->
    <section class="section">
      <div class="container-x">
        <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-violet-700 px-8 py-16 text-center shadow-glow sm:px-16">
          <div class="pointer-events-none absolute inset-0 bg-grid-slate opacity-10" />
          <div class="relative mx-auto max-w-2xl">
            <h2 class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Mari bertumbuh bersama Ordeo
            </h2>
            <p class="mt-4 text-lg text-brand-100">
              Bergabung dengan ribuan seller yang sudah merapikan operasional bisnisnya.
            </p>
            <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <NuxtLink to="/register" class="btn btn-lg bg-white text-brand-700 hover:bg-brand-50 w-full sm:w-auto">
                Mulai Sekarang
              </NuxtLink>
              <NuxtLink to="/contact" class="btn btn-lg border border-white/40 text-white hover:bg-white/10 w-full sm:w-auto">
                Hubungi Kami
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
