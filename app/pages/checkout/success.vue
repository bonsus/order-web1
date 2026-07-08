<script setup lang="ts">
import type { Order } from '~~/server/db/schema'

definePageMeta({ middleware: 'auth' })
useHead({ title: 'Pembayaran Berhasil — Ordeo' })

const { formatRupiah } = useFormat()
const route = useRoute()
const invoice = computed(() => (route.query.invoice as string) || '')

const { data, error } = await useFetch<{ order: Order }>(
  () => `/api/orders/${invoice.value}`,
  { immediate: Boolean(invoice.value) },
)

const order = computed(() => data.value?.order ?? null)

const statusLabel: Record<string, { text: string; class: string }> = {
  pending: { text: 'Menunggu Pembayaran', class: 'bg-amber-100 text-amber-700' },
  paid: { text: 'Lunas', class: 'bg-emerald-100 text-emerald-700' },
  failed: { text: 'Gagal', class: 'bg-red-100 text-red-700' },
  expired: { text: 'Kedaluwarsa', class: 'bg-ink-100 text-ink-600' },
  cancelled: { text: 'Dibatalkan', class: 'bg-ink-100 text-ink-600' },
}

const paymentMethodLabel: Record<string, string> = {
  midtrans: 'Midtrans',
  bank_transfer: 'Transfer Bank Manual',
  dummy: 'Midtrans',
}
</script>

<template>
  <section class="bg-ink-50/50">
    <div class="container-x py-16">
      <div class="mx-auto max-w-xl">
        <div v-if="order" class="overflow-hidden rounded-3xl border border-ink-200 bg-white shadow-glow">
          <div class="bg-gradient-to-br from-brand-600 to-violet-700 px-8 py-10 text-center text-white">
            <div class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/20 backdrop-blur">
              <svg viewBox="0 0 24 24" fill="none" class="h-8 w-8">
                <path d="m5 13 4 4L19 7" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <h1 class="mt-5 text-2xl font-bold">Pesanan berhasil dibuat!</h1>
            <p class="mt-2 text-sm text-brand-100">
              Terima kasih. Rincian pesanan langganan Ordeo Anda ada di bawah ini.
            </p>
          </div>

          <div class="p-8">
            <dl class="space-y-4">
              <div class="flex items-center justify-between">
                <dt class="text-sm text-ink-500">Nomor Invoice</dt>
                <dd class="font-mono text-sm font-semibold text-ink-900">{{ order.invoiceNumber }}</dd>
              </div>
              <div class="flex items-center justify-between border-t border-ink-100 pt-4">
                <dt class="text-sm text-ink-500">Paket</dt>
                <dd class="text-sm font-semibold text-ink-900">Ordeo {{ order.planName }}</dd>
              </div>
              <div class="flex items-center justify-between border-t border-ink-100 pt-4">
                <dt class="text-sm text-ink-500">Total</dt>
                <dd class="text-lg font-bold text-ink-900">{{ formatRupiah(order.amount) }}</dd>
              </div>
              <div class="flex items-center justify-between border-t border-ink-100 pt-4">
                <dt class="text-sm text-ink-500">Status Pembayaran</dt>
                <dd>
                  <span
                    class="rounded-full px-3 py-1 text-xs font-semibold"
                    :class="statusLabel[order.status]?.class"
                  >
                    {{ statusLabel[order.status]?.text ?? order.status }}
                  </span>
                </dd>
              </div>
              <div class="flex items-center justify-between border-t border-ink-100 pt-4">
                <dt class="text-sm text-ink-500">Metode</dt>
                <dd class="text-sm text-ink-700">
                  {{ paymentMethodLabel[order.paymentProvider] ?? order.paymentProvider }}
                </dd>
              </div>
            </dl>

            <div
              v-if="order.status === 'pending'"
              class="mt-6 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-700"
            >
              Pesanan Anda tercatat dengan status <strong>pending</strong>. Setelah pembayaran
              dikonfirmasi oleh payment gateway, status akan otomatis diperbarui menjadi lunas.
            </div>

            <div class="mt-8 flex flex-col gap-3 sm:flex-row">
              <NuxtLink to="/pricing" class="btn-secondary w-full">Lihat Paket Lain</NuxtLink>
              <NuxtLink to="/" class="btn-primary w-full">Ke Beranda</NuxtLink>
            </div>
          </div>
        </div>

        <div v-else class="rounded-3xl border border-ink-200 bg-white p-10 text-center shadow-soft">
          <h1 class="text-xl font-bold text-ink-900">Invoice tidak ditemukan</h1>
          <p class="mt-2 text-sm text-ink-500">
            {{ error?.statusMessage || 'Kami tidak dapat menemukan pesanan yang Anda maksud.' }}
          </p>
          <NuxtLink to="/pricing" class="btn-primary mt-6 inline-flex">Kembali ke Paket</NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
