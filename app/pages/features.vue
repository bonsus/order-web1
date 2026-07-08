<script setup lang="ts">
useHead({ title: 'Fitur — Ordeo' })
</script>

<template>
  <div>
    <section class="bg-radial-brand">
      <div class="container-x py-16 sm:py-20">
        <div class="mx-auto max-w-2xl text-center">
          <span class="eyebrow">Fitur lengkap</span>
          <h1 class="h1 mt-5">Semua yang dibutuhkan seller modern</h1>
          <p class="lead mt-4">
            Ordeo dibangun untuk operasional omnichannel yang cepat, akurat, dan skalabel — dari
            order pertama hingga ribuan pesanan per hari.
          </p>
        </div>
      </div>
    </section>

    <section class="pb-24">
      <div class="container-x space-y-6">
        <article
          v-for="(feature, i) in features"
          :id="feature.id"
          :key="feature.id"
          class="scroll-mt-24 overflow-hidden rounded-3xl border border-ink-200 bg-white shadow-soft"
        >
          <div
            class="grid items-center gap-8 p-8 sm:p-10 lg:grid-cols-2"
            :class="i % 2 === 1 ? 'lg:[&>div:first-child]:order-2' : ''"
          >
            <div>
              <div
                class="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600 text-white shadow-glow"
              >
                <AppIcon :name="feature.icon" class="h-6 w-6" />
              </div>
              <h2 class="mt-5 text-2xl font-bold text-ink-900">{{ feature.title }}</h2>
              <p class="mt-3 text-base leading-relaxed text-ink-600">{{ feature.summary }}</p>
              <ul class="mt-6 space-y-3">
                <li
                  v-for="point in feature.points"
                  :key="point"
                  class="flex items-start gap-3 text-sm text-ink-700"
                >
                  <span
                    class="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600"
                  >
                    <AppIcon name="check" class="h-3 w-3" />
                  </span>
                  {{ point }}
                </li>
              </ul>
            </div>
            <div class="rounded-2xl border border-ink-100 bg-ink-50/60 p-6">
              <div class="space-y-3">
                <div
                  v-for="n in 4"
                  :key="n"
                  class="flex items-center gap-3 rounded-xl border border-ink-100 bg-white p-4"
                >
                  <span
                    class="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-brand-600"
                  >
                    <AppIcon :name="feature.icon" class="h-5 w-5" />
                  </span>
                  <div class="flex-1">
                    <div class="h-2.5 w-1/2 rounded-full bg-ink-200" />
                    <div class="mt-2 h-2 w-3/4 rounded-full bg-ink-100" />
                  </div>
                  <span class="text-xs font-semibold text-emerald-600">OK</span>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>

    <section class="pb-24">
      <div class="container-x">
        <div
          class="rounded-3xl bg-ink-950 px-8 py-14 text-center sm:px-16"
        >
          <h2 class="text-3xl font-extrabold text-white">Coba semua fitur Ordeo</h2>
          <p class="mx-auto mt-3 max-w-xl text-ink-300">
            Pilih paket yang sesuai skala bisnis Anda dan mulai dalam hitungan menit.
          </p>
          <div class="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <NuxtLink to="/pricing" class="btn-primary btn-lg w-full sm:w-auto">Lihat Paket</NuxtLink>
            <NuxtLink to="/register" class="btn btn-lg border border-white/30 text-white hover:bg-white/10 w-full sm:w-auto">
              Mulai Sekarang
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
