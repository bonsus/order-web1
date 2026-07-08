<script setup lang="ts">
import type { Order } from '~~/server/db/schema'

definePageMeta({ middleware: 'auth' })
useHead({ title: 'Invoice — Ordeo' })

const { formatRupiah } = useFormat()

const { data, pending } = await useFetch<{ orders: Order[] }>('/api/account/orders')
const orders = computed(() => data.value?.orders ?? [])

const statusLabel: Record<string, { text: string; class: string }> = {
  pending: { text: 'Menunggu Pembayaran', class: 'bg-amber-100 text-amber-700' },
  paid: { text: 'Lunas', class: 'bg-emerald-100 text-emerald-700' },
  failed: { text: 'Gagal', class: 'bg-red-100 text-red-700' },
  expired: { text: 'Kedaluwarsa', class: 'bg-ink-100 text-ink-600' },
  cancelled: { text: 'Dibatalkan', class: 'bg-ink-100 text-ink-600' },
}

const paymentMethodLabel: Record<string, string> = {
  midtrans: 'Midtrans',
  bank_transfer: 'Transfer Bank',
  dummy: 'Midtrans',
}

function formatDate(value: string): string {
  const d = new Date(value.replace(' ', 'T'))
  if (Number.isNaN(d.getTime())) return value
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}
</script>

<template>
  <section class="bg-ink-50/50">
    <div class="container-x py-10 sm:py-14">
      <div class="mx-auto max-w-5xl">
        <h1 class="text-2xl font-bold text-ink-900 sm:text-3xl">Kelola Akun</h1>
        <p class="mt-1 text-sm text-ink-500">Riwayat invoice dan langganan Anda.</p>

        <div class="mt-8 flex flex-col gap-6 lg:flex-row">
          <AppAccountNav />

          <div class="flex-1">
            <div class="rounded-2xl border border-ink-200 bg-white shadow-soft">
              <div class="flex items-center justify-between border-b border-ink-100 px-6 py-4">
                <h2 class="text-lg font-bold text-ink-900">Daftar Invoice</h2>
                <NuxtLink to="/pricing" class="btn-secondary !py-2 !text-xs">Beli Paket</NuxtLink>
              </div>

              <!-- Loading -->
              <div v-if="pending" class="space-y-3 p-6">
                <div v-for="n in 3" :key="n" class="h-16 animate-pulse rounded-xl bg-ink-50" />
              </div>

              <!-- Empty -->
              <div v-else-if="orders.length === 0" class="px-6 py-16 text-center">
                <div
                  class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-ink-100 text-ink-400"
                >
                  <AppIcon name="order" class="h-6 w-6" />
                </div>
                <p class="mt-4 text-sm font-semibold text-ink-800">Belum ada invoice</p>
                <p class="mt-1 text-sm text-ink-500">
                  Invoice akan muncul di sini setelah Anda berlangganan.
                </p>
                <NuxtLink to="/pricing" class="btn-primary mt-6 inline-flex">Lihat Paket</NuxtLink>
              </div>

              <!-- Desktop table -->
              <div v-else class="hidden overflow-x-auto sm:block">
                <table class="w-full min-w-[640px] text-left text-sm">
                  <thead class="bg-ink-50/70 text-xs uppercase tracking-wide text-ink-500">
                    <tr>
                      <th class="px-6 py-3 font-semibold">Invoice</th>
                      <th class="px-6 py-3 font-semibold">Paket</th>
                      <th class="px-6 py-3 font-semibold">Tanggal</th>
                      <th class="px-6 py-3 font-semibold">Total</th>
                      <th class="px-6 py-3 font-semibold">Status</th>
                      <th class="px-6 py-3 text-right font-semibold">Aksi</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-ink-100">
                    <tr v-for="order in orders" :key="order.id" class="hover:bg-ink-50/50">
                      <td class="px-6 py-4 font-mono text-xs font-semibold text-ink-900">
                        {{ order.invoiceNumber }}
                      </td>
                      <td class="px-6 py-4 text-ink-700">
                        Ordeo {{ order.planName }}
                        <span class="block text-xs text-ink-400">
                          {{ paymentMethodLabel[order.paymentProvider] ?? order.paymentProvider }}
                        </span>
                      </td>
                      <td class="px-6 py-4 text-ink-600">{{ formatDate(order.createdAt) }}</td>
                      <td class="px-6 py-4 font-semibold text-ink-900">
                        {{ formatRupiah(order.amount) }}
                      </td>
                      <td class="px-6 py-4">
                        <span
                          class="rounded-full px-2.5 py-1 text-xs font-semibold"
                          :class="statusLabel[order.status]?.class"
                        >
                          {{ statusLabel[order.status]?.text ?? order.status }}
                        </span>
                      </td>
                      <td class="px-6 py-4 text-right">
                        <NuxtLink
                          :to="`/checkout/success?invoice=${order.invoiceNumber}`"
                          class="text-sm font-semibold text-brand-600 hover:underline"
                        >
                          Lihat
                        </NuxtLink>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Mobile cards -->
              <div v-if="orders.length" class="space-y-3 p-4 sm:hidden">
                <NuxtLink
                  v-for="order in orders"
                  :key="order.id"
                  :to="`/checkout/success?invoice=${order.invoiceNumber}`"
                  class="block rounded-xl border border-ink-200 p-4"
                >
                  <div class="flex items-center justify-between">
                    <span class="font-mono text-xs font-semibold text-ink-900">
                      {{ order.invoiceNumber }}
                    </span>
                    <span
                      class="rounded-full px-2.5 py-1 text-xs font-semibold"
                      :class="statusLabel[order.status]?.class"
                    >
                      {{ statusLabel[order.status]?.text ?? order.status }}
                    </span>
                  </div>
                  <div class="mt-3 flex items-center justify-between">
                    <div>
                      <p class="text-sm font-semibold text-ink-800">Ordeo {{ order.planName }}</p>
                      <p class="text-xs text-ink-400">{{ formatDate(order.createdAt) }}</p>
                    </div>
                    <p class="text-base font-bold text-ink-900">{{ formatRupiah(order.amount) }}</p>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
