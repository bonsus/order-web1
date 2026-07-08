<script setup lang="ts">
const { isLoggedIn, user, logout } = useAuth()
const mobileOpen = ref(false)
const route = useRoute()

const navLinks = [
  { label: 'Fitur', to: '/features' },
  { label: 'Harga', to: '/pricing' },
  { label: 'Alur Kerja', to: '/#workflow' },
  { label: 'FAQ', to: '/#faq' },
]

watch(
  () => route.fullPath,
  () => {
    mobileOpen.value = false
  },
)
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b border-ink-100 bg-white/80 backdrop-blur-lg supports-[backdrop-filter]:bg-white/70"
  >
    <div class="container-x">
      <div class="flex h-16 items-center justify-between gap-4">
        <div class="flex items-center gap-8">
          <AppLogo />
          <nav class="hidden items-center gap-1 lg:flex">
            <NuxtLink
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="rounded-lg px-3 py-2 text-sm font-medium text-ink-600 transition hover:bg-ink-50 hover:text-ink-900"
            >
              {{ link.label }}
            </NuxtLink>
          </nav>
        </div>

        <div class="hidden items-center gap-3 lg:flex">
          <template v-if="isLoggedIn">
            <span class="text-sm text-ink-500">Hai, {{ user?.name?.split(' ')[0] }}</span>
            <button class="btn-secondary" @click="logout">Keluar</button>
            <NuxtLink to="/pricing" class="btn-primary">Kelola Langganan</NuxtLink>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="btn-ghost">Masuk</NuxtLink>
            <NuxtLink to="/register" class="btn-primary">Mulai Sekarang</NuxtLink>
          </template>
        </div>

        <button
          class="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink-700 hover:bg-ink-100 lg:hidden"
          aria-label="Menu"
          @click="mobileOpen = !mobileOpen"
        >
          <svg v-if="!mobileOpen" viewBox="0 0 24 24" fill="none" class="h-6 w-6">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
          <svg v-else viewBox="0 0 24 24" fill="none" class="h-6 w-6">
            <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <div v-if="mobileOpen" class="border-t border-ink-100 bg-white lg:hidden">
      <div class="container-x space-y-1 py-4">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="block rounded-lg px-3 py-2.5 text-sm font-medium text-ink-700 hover:bg-ink-50"
        >
          {{ link.label }}
        </NuxtLink>
        <div class="grid gap-2 pt-3">
          <template v-if="isLoggedIn">
            <NuxtLink to="/pricing" class="btn-primary w-full">Kelola Langganan</NuxtLink>
            <button class="btn-secondary w-full" @click="logout">Keluar</button>
          </template>
          <template v-else>
            <NuxtLink to="/login" class="btn-secondary w-full">Masuk</NuxtLink>
            <NuxtLink to="/register" class="btn-primary w-full">Mulai Sekarang</NuxtLink>
          </template>
        </div>
      </div>
    </div>
  </header>
</template>
