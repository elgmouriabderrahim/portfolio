<template>
  <header class="mb-12 max-w-4xl" :class="alignmentClass">
    <p
      data-reveal
      class="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.34em] text-slate-200"
    >
      <span class="h-1.5 w-1.5 rounded-full bg-white"></span>
      {{ eyebrow }}
    </p>
    <h2 data-reveal class="font-display text-4xl font-bold tracking-[-0.02em] text-white sm:text-5xl lg:text-6xl">
      {{ title }}
    </h2>
    <p v-if="description" data-reveal class="mt-5 max-w-3xl text-base leading-8 text-slate-300">
      {{ description }}
    </p>
  </header>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  eyebrow: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, default: '' },
  align: { type: String, default: 'left' },
});

const alignmentClass = computed(() => (props.align === 'center' ? 'text-center mx-auto' : 'text-left'));
</script>