<script setup lang="ts">
const openFaq = ref<number | null>(0)
function toggleFaq(i: number) {
  openFaq.value = openFaq.value === i ? null : i
}

useHead({ title: 'Ordeo — ERP & Omnichannel Platform untuk Seller yang Serius Bertumbuh' })
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="relative overflow-hidden bg-radial-brand">
      <div
        class="pointer-events-none absolute inset-0 -z-10 bg-grid-slate opacity-[0.35] [mask-image:radial-gradient(60%_50%_at_50%_0%,#000_20%,transparent_100%)]"
      />
      <div class="container-x py-20 sm:py-28">
        <div class="mx-auto max-w-3xl text-center">
          <span class="eyebrow animate-fade-up">
            <AppIcon name="bolt" class="h-3.5 w-3.5" />
            ERP &amp; Omnichannel untuk Seller Indonesia
          </span>
          <h1 class="h1 mt-6 text-balance animate-fade-up">
            ERP &amp; Omnichannel Platform untuk
            <span class="gradient-text">Seller yang Serius Bertumbuh</span>
          </h1>
          <p class="lead mt-6 text-balance animate-fade-up">
            Kelola order marketplace, stok, gudang, pembayaran COD, dan laporan bisnis dalam
            satu sistem.
          </p>
          <div class="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <NuxtLink to="/register" class="btn-primary btn-lg w-full sm:w-auto">
              Mulai Sekarang
              <svg viewBox="0 0 24 24" fill="none" class="h-4 w-4">
                <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </NuxtLink>
            <NuxtLink to="/pricing" class="btn-secondary btn-lg w-full sm:w-auto">
              Lihat Paket
            </NuxtLink>
          </div>
          <p class="mt-5 text-sm text-ink-500">
            Tanpa kartu kredit untuk memulai • Batalkan kapan saja
          </p>
        </div>

        <!-- Dashboard mockup -->
        <div class="mx-auto mt-16 max-w-5xl animate-fade-up">
          <div class="rounded-3xl border border-ink-200 bg-white p-2 shadow-glow">
            <div class="rounded-2xl border border-ink-100 bg-ink-50/60">
              <div class="flex items-center gap-2 border-b border-ink-100 px-4 py-3">
                <span class="h-3 w-3 rounded-full bg-red-400" />
                <span class="h-3 w-3 rounded-full bg-amber-400" />
                <span class="h-3 w-3 rounded-full bg-emerald-400" />
                <span class="ml-3 text-xs font-medium text-ink-400">app.ordeo.id/dashboard</span>
              </div>
              <div class="grid gap-4 p-5 sm:grid-cols-3">
                <div
                  v-for="card in [
                    { label: 'Order hari ini', value: '1.284', delta: '+12,4%' },
                    { label: 'Dana COD masuk', value: 'Rp84,2 jt', delta: '+7,1%' },
                    { label: 'Akurasi stok', value: '99,6%', delta: '+0,3%' },
                  ]"
                  :key="card.label"
                  class="rounded-xl border border-ink-100 bg-white p-4 text-left"
                >
                  <p class="text-xs font-medium text-ink-500">{{ card.label }}</p>
                  <p class="mt-2 text-2xl font-bold text-ink-900">{{ card.value }}</p>
                  <span class="mt-1 inline-block text-xs font-semibold text-emerald-600">{{ card.delta }}</span>
                </div>
                <div class="rounded-xl border border-ink-100 bg-white p-4 sm:col-span-3">
                  <div class="mb-3 flex items-center justify-between">
                    <p class="text-sm font-semibold text-ink-800">Penjualan per channel</p>
                    <span class="text-xs text-ink-400">7 hari terakhir</span>
                  </div>
                  <div class="flex h-28 items-end gap-2">
                    <div
                      v-for="(h, i) in [40, 62, 48, 78, 55, 88, 70]"
                      :key="i"
                      class="flex-1 rounded-t-md bg-gradient-to-t from-brand-200 to-brand-500"
                      :style="{ height: h + '%' }"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
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

    <!-- Features -->
    <section id="features" class="section">
      <div class="container-x">
        <div class="mx-auto max-w-2xl text-center">
          <span class="eyebrow">Satu platform, semua kebutuhan</span>
          <h2 class="h2 mt-5">Semua operasional seller, dalam satu sistem</h2>
          <p class="lead mt-4">
            Berhenti melompat antar tools. Ordeo menyatukan order, stok, gudang, pembayaran, dan
            laporan agar tim Anda bergerak lebih cepat.
          </p>
        </div>

        <div class="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article
            v-for="feature in features"
            :key="feature.id"
            class="card card-hover group"
          >
            <div
              class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white"
            >
              <AppIcon :name="feature.icon" class="h-6 w-6" />
            </div>
            <h3 class="mt-5 text-lg font-bold text-ink-900">{{ feature.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-ink-600">{{ feature.summary }}</p>
            <NuxtLink
              :to="`/features#${feature.id}`"
              class="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-600 transition hover:gap-2"
            >
              Pelajari
              <svg viewBox="0 0 24 24" fill="none" class="h-4 w-4">
                <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </NuxtLink>
          </article>
        </div>
      </div>
    </section>

    <!-- Workflow -->
    <section id="workflow" class="section bg-ink-950 text-white">
      <div class="container-x">
        <div class="mx-auto max-w-2xl text-center">
          <span class="eyebrow border-brand-500/30 bg-brand-500/10 text-brand-300">
            Cara kerja Ordeo
          </span>
          <h2 class="h2 mt-5 text-white">Dari order masuk sampai laporan, otomatis</h2>
          <p class="mt-4 text-lg text-ink-300">
            Alur kerja yang dirancang untuk kecepatan dan akurasi di setiap langkah.
          </p>
        </div>

        <div class="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="(step, i) in workflowSteps"
            :key="step.step"
            class="relative rounded-2xl border border-ink-800 bg-ink-900/60 p-6"
          >
            <span class="text-sm font-bold text-brand-400">{{ step.step }}</span>
            <h3 class="mt-3 text-lg font-bold text-white">{{ step.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-ink-400">{{ step.description }}</p>
            <div
              v-if="i < workflowSteps.length - 1"
              class="absolute -right-3 top-1/2 hidden h-6 w-6 -translate-y-1/2 text-ink-700 lg:block"
            >
              <svg viewBox="0 0 24 24" fill="none" class="h-6 w-6">
                <path d="M5 12h14m0 0-6-6m6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section id="testimonials" class="section">
      <div class="container-x">
        <div class="mx-auto max-w-2xl text-center">
          <span class="eyebrow">Dipercaya seller bertumbuh</span>
          <h2 class="h2 mt-5">Hasil nyata dari tim yang pakai Ordeo</h2>
        </div>
        <div class="mt-14 grid gap-6 lg:grid-cols-3">
          <figure v-for="t in testimonials" :key="t.name" class="card flex flex-col">
            <div class="flex gap-1 text-amber-400">
              <svg v-for="n in 5" :key="n" viewBox="0 0 20 20" fill="currentColor" class="h-4 w-4">
                <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
              </svg>
            </div>
            <blockquote class="mt-4 flex-1 text-sm leading-relaxed text-ink-700">
              &ldquo;{{ t.quote }}&rdquo;
            </blockquote>
            <figcaption class="mt-6 flex items-center gap-3 border-t border-ink-100 pt-4">
              <span
                class="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700"
              >
                {{ t.initials }}
              </span>
              <div>
                <p class="text-sm font-semibold text-ink-900">{{ t.name }}</p>
                <p class="text-xs text-ink-500">{{ t.role }}</p>
              </div>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>

    <!-- FAQ -->
    <section id="faq" class="section bg-ink-50/50">
      <div class="container-x">
        <div class="mx-auto max-w-2xl text-center">
          <span class="eyebrow">Pertanyaan umum</span>
          <h2 class="h2 mt-5">Hal yang sering ditanyakan</h2>
        </div>
        <div class="mx-auto mt-12 max-w-3xl space-y-3">
          <div
            v-for="(faq, i) in faqs"
            :key="i"
            class="overflow-hidden rounded-2xl border border-ink-200 bg-white"
          >
            <button
              class="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              @click="toggleFaq(i)"
            >
              <span class="text-base font-semibold text-ink-900">{{ faq.q }}</span>
              <span
                class="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-ink-100 text-ink-600 transition"
                :class="openFaq === i ? 'rotate-45' : ''"
              >
                <svg viewBox="0 0 24 24" fill="none" class="h-4 w-4">
                  <path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
                </svg>
              </span>
            </button>
            <div v-show="openFaq === i" class="px-6 pb-5 text-sm leading-relaxed text-ink-600">
              {{ faq.a }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section">
      <div class="container-x">
        <div
          class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 to-violet-700 px-8 py-16 text-center shadow-glow sm:px-16"
        >
          <div class="pointer-events-none absolute inset-0 bg-grid-slate opacity-10" />
          <div class="relative mx-auto max-w-2xl">
            <h2 class="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Siap merapikan operasional bisnis Anda?
            </h2>
            <p class="mt-4 text-lg text-brand-100">
              Bergabung dengan ribuan seller yang bertumbuh bersama Ordeo. Mulai hari ini.
            </p>
            <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <NuxtLink to="/register" class="btn btn-lg bg-white text-brand-700 hover:bg-brand-50 w-full sm:w-auto">
                Mulai Sekarang
              </NuxtLink>
              <NuxtLink to="/pricing" class="btn btn-lg border border-white/40 text-white hover:bg-white/10 w-full sm:w-auto">
                Lihat Paket
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
