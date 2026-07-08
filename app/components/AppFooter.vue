<script setup lang="ts">
const year = new Date().getFullYear()

const columns = [
  {
    title: 'Produk',
    links: [
      { label: 'Fitur', to: '/features' },
      { label: 'Harga', to: '/pricing' },
      { label: 'Alur Kerja', to: '/#workflow' },
      { label: 'Testimoni', to: '/#testimonials' },
    ],
  },
  {
    title: 'Solusi',
    links: [
      { label: 'Order Management', to: '/features#order' },
      { label: 'Inventory & FIFO', to: '/features#inventory' },
      { label: 'Marketplace Integration', to: '/features#marketplace' },
      { label: 'COD Reconciliation', to: '/features#cod' },
    ],
  },
  {
    title: 'Perusahaan',
    links: [
      { label: 'Tentang Ordeo', to: '/about' },
      { label: 'Kontak', to: '/contact' },
      { label: 'FAQ', to: '/#faq' },
      { label: 'Mulai Sekarang', to: '/register' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Syarat & Ketentuan', to: '/terms' },
      { label: 'Kebijakan Privasi', to: '/privacy' },
      { label: 'Kebijakan Refund', to: '/refund-policy' },
    ],
  },
]
</script>

<template>
  <footer class="border-t border-ink-100 bg-ink-950 text-ink-300">
    <div class="container-x py-16">
      <div class="grid gap-12 lg:grid-cols-[1.5fr_2fr]">
        <div class="max-w-sm">
          <AppLogo variant="light" />
          <p class="mt-4 text-sm leading-relaxed text-ink-400">
            Ordeo adalah platform ERP &amp; omnichannel yang membantu seller mengelola order,
            stok, gudang, pembayaran COD, dan laporan bisnis dalam satu sistem terpadu.
          </p>
          <div class="mt-6 flex items-center gap-3">
            <a
              v-for="social in ['X', 'IG', 'IN', 'YT']"
              :key="social"
              href="#"
              class="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-800 text-xs font-semibold text-ink-400 transition hover:border-brand-500 hover:text-white"
            >
              {{ social }}
            </a>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div v-for="col in columns" :key="col.title">
            <h4 class="text-sm font-semibold text-white">{{ col.title }}</h4>
            <ul class="mt-4 space-y-3">
              <li v-for="link in col.links" :key="link.label">
                <NuxtLink
                  :to="link.to"
                  class="text-sm text-ink-400 transition hover:text-white"
                >
                  {{ link.label }}
                </NuxtLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div
        class="mt-12 flex flex-col items-start justify-between gap-4 border-t border-ink-800 pt-8 sm:flex-row sm:items-center"
      >
        <p class="text-sm text-ink-500">
          &copy; {{ year }} Ordeo. PT Ordeo Mitra Digital. Seluruh hak cipta dilindungi.
        </p>
        <div class="flex items-center gap-6 text-sm text-ink-500">
          <NuxtLink to="/terms" class="hover:text-white">Syarat</NuxtLink>
          <NuxtLink to="/privacy" class="hover:text-white">Privasi</NuxtLink>
          <NuxtLink to="/refund-policy" class="hover:text-white">Refund</NuxtLink>
        </div>
      </div>
    </div>
  </footer>
</template>
