<template>
  <div class="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/25 hover:bg-white/8">
    <div class="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-violet-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
    <div class="relative flex items-start justify-between gap-4">
      <div>
        <p class="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-200/80">{{ category }}</p>
        <h3 class="text-lg font-semibold text-white">{{ title }}</h3>
      </div>
      <span class="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-slate-200">{{ items.length }}</span>
    </div>

    <div class="relative mt-5 flex flex-wrap gap-2">
      <span
        v-for="item in items"
        :key="item"
        class="rounded-full border border-white/8 bg-slate-950/45 px-3 py-1.5 text-xs text-slate-200 transition-colors duration-300 group-hover:border-cyan-300/25 group-hover:text-white"
      >
        {{ item }}
      </span>
    </div>

    <div class="relative mt-6 h-1.5 overflow-hidden rounded-full bg-white/10">
      <div class="h-full rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-500" :style="{ width: `${Math.max(55, items.length * 16)}%` }"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  category: { type: String, required: true },
  title: { type: String, required: true },
  items: { type: Array, required: true },
});
</script>