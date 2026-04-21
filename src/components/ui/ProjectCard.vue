<template>
  <button
    class="group relative w-full overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 text-left transition-all duration-300 hover:-translate-y-2 hover:border-cyan-300/25 hover:bg-white/8"
    :style="cardStyle"
    @mousemove="onMove"
    @mouseleave="onLeave"
    @click="emit('select', project)"
  >
    <div class="spotlight pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
    <div class="absolute inset-0 bg-gradient-to-br from-cyan-400/8 via-transparent to-violet-500/8 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
    <div class="relative flex h-full flex-col">
      <div class="flex items-start justify-between gap-4">
        <div>
          <p class="mb-2 text-xs uppercase tracking-[0.3em] text-cyan-200/80">{{ project.type }}</p>
          <h3 class="text-xl font-semibold text-white">{{ project.name }}</h3>
        </div>
        <span class="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-slate-300">Featured</span>
      </div>

      <p class="mt-4 text-sm leading-6 text-slate-300">{{ project.summary }}</p>

      <ul class="mt-5 space-y-2 text-sm text-slate-200">
        <li v-for="point in project.highlights" :key="point" class="flex gap-3">
          <span class="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300"></span>
          <span>{{ point }}</span>
        </li>
      </ul>

      <div class="mt-6 flex flex-wrap gap-2">
        <span
          v-for="stack in project.stack"
          :key="stack"
          class="rounded-full border border-white/8 bg-slate-950/45 px-3 py-1.5 text-xs text-cyan-100"
        >
          {{ stack }}
        </span>
      </div>

      <div class="mt-6 flex items-center justify-between border-t border-white/10 pt-5 text-sm text-slate-300">
        <span>{{ project.impact }}</span>
        <span class="text-cyan-200 transition-transform duration-300 group-hover:translate-x-1">Open →</span>
      </div>
    </div>
  </button>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  project: { type: Object, required: true },
});

const emit = defineEmits(['select']);

const tilt = ref({ x: 0, y: 0, mx: 50, my: 50 });

const cardStyle = computed(() => ({
  transform: `perspective(1000px) rotateX(${tilt.value.x}deg) rotateY(${tilt.value.y}deg)`,
  '--mx': `${tilt.value.mx}%`,
  '--my': `${tilt.value.my}%`,
}));

function onMove(event) {
  const target = event.currentTarget;
  if (!(target instanceof HTMLElement)) return;

  const rect = target.getBoundingClientRect();
  const px = ((event.clientX - rect.left) / rect.width) * 100;
  const py = ((event.clientY - rect.top) / rect.height) * 100;

  // Map pointer position to small rotation for a premium 3D card interaction.
  tilt.value = {
    x: ((50 - py) / 50) * 4,
    y: ((px - 50) / 50) * 4,
    mx: px,
    my: py,
  };
}

function onLeave() {
  tilt.value = { x: 0, y: 0, mx: 50, my: 50 };
}
</script>

<style scoped>
.spotlight {
  background: radial-gradient(circle at var(--mx) var(--my), rgba(82, 224, 255, 0.24), transparent 40%);
}
</style>