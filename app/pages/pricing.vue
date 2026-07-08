<script setup lang="ts">
import type { Plan } from '~~/server/db/schema'

useHead({ title: 'Harga — Ordeo' })

const { formatRupiah } = useFormat()
const { data, pending } = await useFetch<{ plans: Plan[] }>('/api/plans')

const plans = computed(() => data.value?.plans ?? [])

const comparison = [
  { label: 'Order per bulan', values: ['500', '5.000', 'Tanpa batas'] },
  { label: 'Channel marketplace', values: ['2', 'Tanpa batas', 'Tanpa batas'] },
  { label: 'Jumlah gudang', values: ['1', '3', 'Tanpa batas'] },
  { label: 'FIFO & multi-gudang', values: ['—', '✓', '✓'] },
  { label: 'Rekonsiliasi COD', values: ['—', '✓', '✓'] },
  { label: 'Analytics & finance', values: ['Dasar', 'Lengkap', 'Lengkap'] },
  { label: 'Role & permission tim', values: ['—', '—', '✓'] },
  { label: 'API & webhook', values: ['—', '—', '✓'] },
  { label: 'Dukungan', values: ['Email', 'Prioritas', 'Dedicated'] },
]
</script>

<template>
  <div>
    <section class="bg-radial-brand">
      <div class="container-x py-16 sm:py-20">
        <div class="mx-auto max-w-2xl text-center">
          <span class="eyebrow">Harga transparan</span>
          <h1 class="h1 mt-5">Paket yang tumbuh bersama bisnis Anda</h1>
          <p class="lead mt-4">
            Tanpa biaya tersembunyi. Semua paket termasuk update fitur dan bisa dibatalkan kapan
            saja.
          </p>
        </div>
      </div>
    </section>

    <section class="pb-20">
      <div class="container-x">
        <div v-if="pending" class="grid gap-6 lg:grid-cols-3">
          <div v-for="n in 3" :key="n" class="card h-96 animate-pulse bg-ink-50" />
        </div>

        <div v-else class="grid items-stretch gap-6 lg:grid-cols-3">
          <div
            v-for="plan in plans"
            :key="plan.code"
            class="relative flex flex-col rounded-3xl border bg-white p-8 transition"
            :class="
              plan.highlighted
                ? 'border-brand-300 shadow-glow ring-1 ring-brand-200'
                : 'border-ink-200 shadow-soft'
            "
          >
            <span
              v-if="plan.highlighted"
              class="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-4 py-1 text-xs font-semibold text-white shadow-glow"
            >
              Paling populer
            </span>

            <h3 class="text-lg font-bold text-ink-900">{{ plan.name }}</h3>
            <p class="mt-1.5 text-sm text-ink-500">{{ plan.tagline }}</p>

            <div class="mt-6 flex items-end gap-1">
              <span class="text-4xl font-extrabold tracking-tight text-ink-900">
                {{ formatRupiah(plan.price) }}
              </span>
              <span class="mb-1 text-sm text-ink-500">/bulan</span>
            </div>

            <NuxtLink
              :to="`/checkout?plan=${plan.code}`"
              class="mt-6 w-full"
              :class="plan.highlighted ? 'btn-primary' : 'btn-secondary'"
            >
              Pilih {{ plan.name }}
            </NuxtLink>

            <ul class="mt-8 space-y-3.5 border-t border-ink-100 pt-6">
              <li
                v-for="item in plan.features"
                :key="item"
                class="flex items-start gap-3 text-sm text-ink-700"
              >
                <span
                  class="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600"
                >
                  <AppIcon name="check" class="h-3 w-3" />
                </span>
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparison -->
    <section class="pb-24">
      <div class="container-x">
        <h2 class="text-center text-2xl font-bold text-ink-900">Bandingkan paket</h2>
        <div class="mt-8 overflow-hidden rounded-2xl border border-ink-200 bg-white shadow-soft">
          <div class="overflow-x-auto">
            <table class="w-full min-w-[560px] text-left text-sm">
              <thead class="bg-ink-50/70 text-ink-700">
                <tr>
                  <th class="px-6 py-4 font-semibold">Fitur</th>
                  <th class="px-6 py-4 text-center font-semibold">Starter</th>
                  <th class="px-6 py-4 text-center font-semibold">Growth</th>
                  <th class="px-6 py-4 text-center font-semibold">Business</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-ink-100">
                <tr v-for="row in comparison" :key="row.label">
                  <td class="px-6 py-4 font-medium text-ink-800">{{ row.label }}</td>
                  <td
                    v-for="(v, i) in row.values"
                    :key="i"
                    class="px-6 py-4 text-center text-ink-600"
                  >
                    {{ v }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
