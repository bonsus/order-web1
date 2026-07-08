<script setup lang="ts">
const { user } = useAuth()

const links = [
  { label: 'Profil', to: '/account/profile', icon: 'users' as const },
  { label: 'Invoice', to: '/account/invoices', icon: 'order' as const },
]
</script>

<template>
  <aside class="w-full lg:w-64 lg:flex-shrink-0">
    <div class="rounded-2xl border border-ink-200 bg-white p-4 shadow-soft">
      <div class="flex items-center gap-3 border-b border-ink-100 px-2 pb-4">
        <span
          class="flex h-11 w-11 items-center justify-center rounded-full bg-brand-100 text-sm font-bold text-brand-700"
        >
          {{
            (user?.name ?? 'U')
              .split(' ')
              .slice(0, 2)
              .map((w) => w[0])
              .join('')
              .toUpperCase()
          }}
        </span>
        <div class="min-w-0">
          <p class="truncate text-sm font-semibold text-ink-900">{{ user?.name }}</p>
          <p class="truncate text-xs text-ink-500">{{ user?.email }}</p>
        </div>
      </div>

      <nav class="mt-3 space-y-1">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition"
          active-class="bg-brand-50 text-brand-700"
          exact-active-class="bg-brand-50 text-brand-700"
        >
          <AppIcon :name="link.icon" class="h-5 w-5" />
          {{ link.label }}
        </NuxtLink>
      </nav>
    </div>
  </aside>
</template>
