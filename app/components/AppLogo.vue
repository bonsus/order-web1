<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'dark' | 'light'
  }>(),
  { variant: 'dark' },
)
</script>

<template>
  <NuxtLink to="/" class="inline-flex items-center gap-2.5">
    <span
      class="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-violet-600 text-white shadow-glow"
    >
      <svg viewBox="0 0 24 24" fill="none" class="h-5 w-5">
        <path
          d="M12 2 3 7v10l9 5 9-5V7l-9-5Z"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linejoin="round"
        />
        <path
          d="m7.5 9.5 4.5 2.5 4.5-2.5M12 12v5"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linejoin="round"
          stroke-linecap="round"
        />
      </svg>
    </span>
    <span
      class="text-lg font-extrabold tracking-tight"
      :class="variant === 'dark' ? 'text-ink-900' : 'text-white'"
    >
      Ordeo
    </span>
  </NuxtLink>
</template>
