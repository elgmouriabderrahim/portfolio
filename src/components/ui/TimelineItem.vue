<template>
  <article class="relative flex gap-5 pb-10 pl-8 sm:pl-10">
    <div class="absolute left-0 top-2 flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-slate-950/90 sm:h-11 sm:w-11">
      <span class="h-2.5 w-2.5 rounded-full bg-white"></span>
    </div>
    <div class="glass w-full rounded-3xl p-6 sm:p-7">
      <div class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p class="text-xs uppercase tracking-[0.3em] text-slate-300">{{ item.period }}</p>
          <h3 class="mt-2 text-xl font-semibold text-white">{{ item.institution }}</h3>
        </div>
        <span class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300">{{ item.title }}</span>
      </div>
      <p class="mt-4 max-w-2xl text-sm leading-7 text-slate-300">{{ item.details }}</p>
    </div>
  </article>
</template>

<script setup>
defineProps({
  item: { type: Object, required: true },
});
</script>