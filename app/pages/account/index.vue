<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
await navigateTo('/account/profile', { redirectCode: 302 })
</script>

<template>
  <div />
</template>
