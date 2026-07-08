<script setup lang="ts">
import type { Plan } from '~~/server/db/schema'

definePageMeta({ middleware: 'auth' })
useHead({ title: 'Checkout — Ordeo' })

const { formatRupiah } = useFormat()
const { user } = useAuth()
const route = useRoute()

const { data: plansData } = await useFetch<{ plans: Plan[] }>('/api/plans')
const plans = computed(() => plansData.value?.plans ?? [])

const selectedCode = ref((route.query.plan as string) || 'growth')
const selectedPlan = computed(
  () => plans.value.find((p) => p.code === selectedCode.value) ?? plans.value[0],
)

const businessTypes = [
  'Perorangan / UMKM',
  'CV',
  'PT',
  'Reseller / Dropshipper',
  'Distributor',
  'Brand / Manufaktur',
]

const paymentMethods = [
//   {
//     code: 'midtrans',
//     name: 'Midtrans',
//     description: 'Kartu kredit, GoPay, ShopeePay, QRIS, & Virtual Account',
//     recommended: true,
//   },
  {
    code: 'bank_transfer',
    name: 'Transfer Bank Manual',
    description: 'Konfirmasi manual via bukti transfer',
    recommended: false,
  },
]
const selectedMethod = ref('bank_transfer')

const form = reactive({
  name: user.value?.businessName ?? '',
  type: businessTypes[0],
  address: '',
  city: '',
  province: '',
  postalCode: '',
})

const loading = ref(false)
const error = ref('')

async function onSubmit() {
  if (!selectedPlan.value) {
    error.value = 'Paket tidak valid.'
    return
  }
  error.value = ''
  loading.value = true
  try {
    const res = await $fetch<{ invoiceNumber: string; redirectUrl: string }>(
      '/api/checkout/create-order',
      {
        method: 'POST',
        body: {
          planCode: selectedPlan.value.code,
          paymentMethod: selectedMethod.value,
          business: { ...form },
        },
      },
    )
    await navigateTo(res.redirectUrl)
  } catch (e: any) {
    error.value = e?.data?.statusMessage || e?.statusMessage || 'Gagal memproses pembayaran.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <section class="bg-ink-50/50">
    <div class="container-x py-12 sm:py-16">
      <div class="mx-auto max-w-5xl">
        <NuxtLink to="/pricing" class="inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-ink-800">
          <svg viewBox="0 0 24 24" fill="none" class="h-4 w-4">
            <path d="M19 12H5m0 0 6 6m-6-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
          Kembali ke daftar paket
        </NuxtLink>

        <h1 class="mt-4 text-3xl font-bold text-ink-900">Selesaikan pesanan Anda</h1>
        <p class="mt-2 text-ink-500">Lengkapi data bisnis untuk mengaktifkan langganan Ordeo.</p>

        <div class="mt-8 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <!-- Form -->
          <form class="order-2 lg:order-1" @submit.prevent="onSubmit">
            <div class="card">
              <h2 class="text-lg font-bold text-ink-900">Pilih paket</h2>
              <div class="mt-4 grid gap-3 sm:grid-cols-3">
                <label
                  v-for="plan in plans"
                  :key="plan.code"
                  class="cursor-pointer rounded-xl border p-4 transition"
                  :class="
                    selectedCode === plan.code
                      ? 'border-brand-500 bg-brand-50 ring-1 ring-brand-300'
                      : 'border-ink-200 hover:border-ink-300'
                  "
                >
                  <input v-model="selectedCode" type="radio" :value="plan.code" class="sr-only" />
                  <span class="block text-sm font-semibold text-ink-900">{{ plan.name }}</span>
                  <span class="mt-1 block text-xs text-ink-500">{{ formatRupiah(plan.price) }}/bln</span>
                </label>
              </div>
            </div>

            <div class="card mt-6">
              <h2 class="text-lg font-bold text-ink-900">Data bisnis</h2>
              <div class="mt-4 space-y-4">
                <div class="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label class="label" for="bname">Nama bisnis</label>
                    <input id="bname" v-model="form.name" class="input" type="text" placeholder="Nama toko / brand" required />
                  </div>
                  <div>
                    <label class="label" for="btype">Tipe bisnis</label>
                    <select id="btype" v-model="form.type" class="input" required>
                      <option v-for="t in businessTypes" :key="t" :value="t">{{ t }}</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label class="label" for="address">Alamat</label>
                  <textarea id="address" v-model="form.address" class="input" rows="2" placeholder="Alamat lengkap bisnis" required />
                </div>
                <div class="grid gap-4 sm:grid-cols-3">
                  <div>
                    <label class="label" for="city">Kota</label>
                    <input id="city" v-model="form.city" class="input" type="text" placeholder="Kota" required />
                  </div>
                  <div>
                    <label class="label" for="province">Provinsi</label>
                    <input id="province" v-model="form.province" class="input" type="text" placeholder="Provinsi" required />
                  </div>
                  <div>
                    <label class="label" for="postal">Kode pos</label>
                    <input id="postal" v-model="form.postalCode" class="input" type="text" placeholder="12345" required />
                  </div>
                </div>
              </div>
            </div>

            <div class="card mt-6">
              <h2 class="text-lg font-bold text-ink-900">Metode pembayaran</h2>
              <div class="mt-4 space-y-3">
                <label
                  v-for="method in paymentMethods"
                  :key="method.code"
                  class="flex cursor-pointer items-start gap-3 rounded-xl border p-4 transition"
                  :class="
                    selectedMethod === method.code
                      ? 'border-brand-500 bg-brand-50 ring-1 ring-brand-300'
                      : 'border-ink-200 hover:border-ink-300'
                  "
                >
                  <input
                    v-model="selectedMethod"
                    type="radio"
                    name="payment-method"
                    :value="method.code"
                    class="mt-1 h-4 w-4 accent-brand-600"
                  />
                  <span class="flex-1">
                    <span class="flex items-center gap-2">
                      <span class="text-sm font-semibold text-ink-900">{{ method.name }}</span>
                      <span
                        v-if="method.recommended"
                        class="rounded-full bg-brand-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-brand-700"
                      >
                        Direkomendasikan
                      </span>
                    </span>
                    <span class="mt-0.5 block text-xs text-ink-500">{{ method.description }}</span>
                  </span>
                  <span
                    class="mt-0.5 flex h-8 items-center rounded-md border border-ink-200 bg-white px-2 text-xs font-bold text-ink-700"
                  >
                    {{ method.code === 'midtrans' ? 'midtrans' : 'BANK' }}
                  </span>
                </label>
              </div>

              <p v-if="error" class="field-error mt-4">{{ error }}</p>

              <button type="submit" class="btn-primary btn-lg mt-6 w-full" :disabled="loading">
                {{ loading ? 'Memproses pembayaran...' : `Bayar Sekarang ${selectedPlan ? '· ' + formatRupiah(selectedPlan.price) : ''}` }}
              </button>
              <p class="mt-3 flex items-center justify-center gap-1.5 text-xs text-ink-400">
                <AppIcon name="lock" class="h-3.5 w-3.5" />
                Pembayaran diproses dengan aman
              </p>
            </div>
          </form>

          <!-- Summary -->
          <aside class="order-1 lg:order-2">
            <div class="sticky top-24 rounded-2xl border border-ink-200 bg-white p-6 shadow-soft">
              <h2 class="text-sm font-semibold uppercase tracking-wide text-ink-500">Ringkasan</h2>
              <div v-if="selectedPlan" class="mt-4">
                <div class="flex items-center justify-between">
                  <div>
                    <p class="font-bold text-ink-900">Ordeo {{ selectedPlan.name }}</p>
                    <p class="text-xs text-ink-500">Langganan bulanan</p>
                  </div>
                  <p class="font-semibold text-ink-900">{{ formatRupiah(selectedPlan.price) }}</p>
                </div>

                <ul class="mt-5 space-y-2 border-t border-ink-100 pt-5">
                  <li
                    v-for="item in selectedPlan.features.slice(0, 5)"
                    :key="item"
                    class="flex items-start gap-2 text-xs text-ink-600"
                  >
                    <AppIcon name="check" class="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-brand-600" />
                    {{ item }}
                  </li>
                </ul>

                <div class="mt-5 space-y-2 border-t border-ink-100 pt-5 text-sm">
                  <div class="flex justify-between text-ink-600">
                    <span>Subtotal</span>
                    <span>{{ formatRupiah(selectedPlan.price) }}</span>
                  </div>
                  <div class="flex justify-between text-ink-600">
                    <span>PPN</span>
                    <span>Termasuk</span>
                  </div>
                  <div class="flex justify-between border-t border-ink-100 pt-3 text-base font-bold text-ink-900">
                    <span>Total</span>
                    <span>{{ formatRupiah(selectedPlan.price) }}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </section>
</template>
