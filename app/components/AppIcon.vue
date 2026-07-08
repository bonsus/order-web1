<script setup lang="ts">
defineProps<{
  name: keyof typeof paths
  class?: string
}>()

const paths = {
  order: 'M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2m-6 9 2 2 4-4',
  inventory: 'M20 7 12 3 4 7m16 0-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
  marketplace: 'M3 9h18M3 9l1.5-4.5A2 2 0 0 1 6.4 3h11.2a2 2 0 0 1 1.9 1.5L21 9M3 9v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9M8 13h8',
  warehouse: 'M3 21V9l9-5 9 5v12M3 21h18M7 21v-6h4v6m4 0v-6h2v6M9 12h.01',
  cod: 'M12 8v8m0-8c-1.66 0-3 .9-3 2s1.34 2 3 2 3 .9 3 2-1.34 2-3 2m0-8c1.11 0 2.08.4 2.6 1M12 16c-1.11 0-2.08-.4-2.6-1M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
  analytics: 'M4 20V10m6 10V4m6 16v-6M4 20h16',
  shield: 'M12 3 4 6v5c0 5 3.4 8.5 8 10 4.6-1.5 8-5 8-10V6l-8-3Z',
  bolt: 'M13 2 3 14h7l-1 8 10-12h-7l1-8Z',
  sync: 'M4 4v6h6M20 20v-6h-6M20 8a8 8 0 0 0-14.9-2M4 16a8 8 0 0 0 14.9 2',
  check: 'm5 13 4 4L19 7',
  users: 'M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm14 10v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11',
  globe: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0 0c2.5-2.5 3.75-6 3.75-9S14.5 5.5 12 3m0 18c-2.5-2.5-3.75-6-3.75-9S9.5 5.5 12 3M3.5 9h17M3.5 15h17',
  lock: 'M6 11V8a6 6 0 1 1 12 0v3M5 11h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1Z',
  clock: 'M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z',
} as const
</script>

<template>
  <svg viewBox="0 0 24 24" fill="none" :class="$props.class ?? 'h-6 w-6'">
    <path
      :d="paths[name]"
      stroke="currentColor"
      stroke-width="1.7"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
