<template>
  <section class="technology-game" aria-label="Technology chase game">
    <header class="technology-game-heading">
      <div><p class="eyebrow">INTERACTIVE SANDBOX</p><h3>Catch a <em>technology.</em></h3><p>They flee when your mouse gets close. Click a logo to catch it!</p></div>
      <span class="technology-score">{{ caughtCount }} / {{ technologies.length }} caught</span>
    </header>
    <div ref="arena" class="technology-arena" @pointermove="trackPointer" @pointerleave="clearPointer">
      <button v-for="(technology, index) in technologies" v-show="!technology.caught" :key="technology.name"
        class="technology-runner" :style="{ transform: `translate(${technology.x}px, ${technology.y}px)` }"
        :aria-label="`Catch ${technology.name}`" :title="technology.name" @click="catchTechnology(index, $event)">
        <img :src="technology.image" alt="" draggable="false" width="36" height="36" />
      </button>
      <div v-if="celebrating" :key="celebrationId" class="technology-confetti" aria-hidden="true"><i v-for="piece in confetti" :key="piece.id" :style="piece.style"></i></div>
      <div v-if="caughtCount === technologies.length" class="technology-complete"><span aria-hidden="true">✦</span><strong>Collection complete!</strong><p>You caught every technology.</p><button ref="playAgain" class="ubuntu-primary" @click="resetGame">Play again</button></div>
    </div>
    <footer class="technology-game-footer">
      <div role="status" aria-live="polite" aria-atomic="true"><strong v-if="lastCaught">You won! You caught {{ lastCaught }}.</strong><span v-else>Ready, set, catch.</span><small>{{ caughtCount === technologies.length ? 'All 8 technologies caught. Nicely done!' : 'Tap a logo on touch screens, or use Tab and Enter.' }}</small></div>
      <button v-if="caughtCount > 0 && caughtCount < technologies.length" class="technology-reset" @click="resetGame">Start over ↻</button>
    </footer>
  </section>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue';
import { desktopSettings } from '@/composables/useDesktopSettings';
import docker from '@/assets/images/technologies/docker.svg';
import figma from '@/assets/images/technologies/figma.svg';
import python from '@/assets/images/technologies/python.svg';
import laravel from '@/assets/images/technologies/laravel.svg';
import vue from '@/assets/images/technologies/vuejs.svg';
import react from '@/assets/images/technologies/react.svg';
import fastapi from '@/assets/images/technologies/fastapi.svg';
import postgresql from '@/assets/images/technologies/postgresql.svg';

const arena = ref(null);
const playAgain = ref(null);
const technologies = ref(Object.entries({ Docker: docker, Figma: figma, Python: python, Laravel: laravel, Vue: vue, React: react, FastAPI: fastapi, PostgreSQL: postgresql }).map(([name, image]) => ({ name, image, x: 0, y: 0, caught: false, escapedAt: -Infinity })));
const caughtCount = computed(() => technologies.value.filter(item => item.caught).length);
const lastCaught = ref('');
const celebrating = ref(false);
const celebrationId = ref(0);
const reducedMotion = ref(false);
const confetti = Array.from({ length: 32 }, (_, id) => ({ id, style: { left: `${(id * 37) % 100}%`, '--drift': `${Math.sin(id * 2.4) * 110}px`, '--spin': `${id % 2 ? 540 : -540}deg`, background: ['#ee956a', '#8bcbaa', '#c4a0e8', '#f1d68b', '#8dbbe7'][id % 5], animationDelay: `${(id % 6) * 45}ms` } }));
const size = 52;
const padding = 12;
let observer;
let motionQuery;
let frame = 0;
let celebrationTimer;
let pointer = null;

function layout() {
  const area = arena.value;
  if (!area || area.clientWidth < size) return;
  clearPointer();
  const remaining = technologies.value.filter(item => !item.caught);
  const columns = Math.min(4, Math.max(1, Math.floor((area.clientWidth - padding * 2) / 76)));
  const rows = Math.max(1, Math.ceil(remaining.length / columns));
  const cellWidth = (area.clientWidth - padding * 2) / columns;
  const cellHeight = (area.clientHeight - padding * 2) / rows;
  remaining.forEach((item, index) => {
    item.x = padding + cellWidth * (index % columns) + (cellWidth - size) / 2;
    item.y = padding + cellHeight * Math.floor(index / columns) + (cellHeight - size) / 2;
    item.escapedAt = -Infinity;
  });
}
function clearPointer() { pointer = null; cancelAnimationFrame(frame); frame = 0; }
function trackPointer(event) {
  if (event.pointerType !== 'mouse' || event.buttons || reducedMotion.value) return;
  pointer = { x: event.clientX, y: event.clientY };
  if (!frame) frame = requestAnimationFrame(fleeNearby);
}
function fleeNearby(now) {
  frame = 0;
  if (!pointer || !arena.value) return;
  const bounds = arena.value.getBoundingClientRect();
  const mouseX = pointer.x - bounds.left;
  const mouseY = pointer.y - bounds.top;
  const buttons = arena.value.querySelectorAll('.technology-runner');
  technologies.value.forEach((item, index) => {
    if (item.caught || now - item.escapedAt < 650 || buttons[index].matches(':focus-visible')) return;
    const rect = buttons[index].getBoundingClientRect();
    if (Math.hypot(pointer.x - rect.left - size / 2, pointer.y - rect.top - size / 2) > 90) return;
    const maxX = arena.value.clientWidth - size - padding;
    const maxY = arena.value.clientHeight - size - padding;
    let best = null;
    let bestScore = -Infinity;
    for (let attempt = 0; attempt < 36; attempt++) {
      const x = padding + Math.random() * Math.max(0, maxX - padding);
      const y = padding + Math.random() * Math.max(0, maxY - padding);
      const separation = Math.min(...technologies.value.filter(other => other !== item && !other.caught).map(other => Math.hypot(x - other.x, y - other.y)), 150);
      const distance = Math.hypot(x + size / 2 - mouseX, y + size / 2 - mouseY);
      const score = Math.min(distance, 230) + Math.min(separation, 90) * 2 - (separation < 66 ? 500 : 0);
      if (score > bestScore) { bestScore = score; best = { x, y }; }
    }
    if (best) { item.x = best.x; item.y = best.y; item.escapedAt = now; }
  });
}
function catchTechnology(index, event) {
  const item = technologies.value[index];
  if (item.caught) return;
  clearPointer();
  item.caught = true;
  lastCaught.value = item.name;
  celebrationId.value++;
  celebrating.value = !reducedMotion.value;
  clearTimeout(celebrationTimer);
  celebrationTimer = setTimeout(() => { celebrating.value = false; }, 1700);
  if (event.detail === 0) nextTick(() => {
    const next = [...arena.value.querySelectorAll('.technology-runner')].find(button => button.style.display !== 'none');
    (next || playAgain.value)?.focus({ preventScroll: true });
  });
}
function resetGame() {
  clearTimeout(celebrationTimer);
  celebrating.value = false;
  lastCaught.value = '';
  technologies.value.forEach(item => { item.caught = false; });
  layout();
  nextTick(() => arena.value.querySelector('.technology-runner')?.focus({ preventScroll: true }));
}
function updateMotion() { reducedMotion.value = motionQuery.matches || !desktopSettings.animations; if (reducedMotion.value) { clearPointer(); celebrating.value = false; } }
watch(() => desktopSettings.animations, () => { if (motionQuery) updateMotion(); });
onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  updateMotion();
  motionQuery.addEventListener('change', updateMotion);
  observer = new ResizeObserver(layout);
  observer.observe(arena.value);
});
onBeforeUnmount(() => { observer?.disconnect(); motionQuery?.removeEventListener('change', updateMotion); clearPointer(); clearTimeout(celebrationTimer); });
</script>
