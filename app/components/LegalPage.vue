<script setup lang="ts">
defineProps<{
  title: string
  updated: string
  intro: string
}>()
</script>

<template>
  <section>
    <div class="border-b border-ink-100 bg-ink-50/50">
      <div class="container-x py-14">
        <div class="mx-auto max-w-3xl">
          <span class="eyebrow">Legal</span>
          <h1 class="mt-4 text-3xl font-bold text-ink-900 sm:text-4xl">{{ title }}</h1>
          <p class="mt-3 text-ink-600">{{ intro }}</p>
          <p class="mt-4 text-sm text-ink-400">Terakhir diperbarui: {{ updated }}</p>
        </div>
      </div>
    </div>

    <div class="container-x py-14">
      <article
        class="prose-legal mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-ink-700"
      >
        <slot />
      </article>
    </div>
  </section>
</template>

<style scoped>
.prose-legal :deep(h2) {
  @apply text-lg font-bold text-ink-900;
}
.prose-legal :deep(h2) {
  margin-bottom: 0.5rem;
}
.prose-legal :deep(p) {
  @apply text-ink-600;
}
.prose-legal :deep(ul) {
  @apply mt-3 space-y-2 pl-5;
  list-style: disc;
}
.prose-legal :deep(li) {
  @apply text-ink-600;
}
.prose-legal :deep(a) {
  @apply font-medium text-brand-600 hover:underline;
}
</style>
