<template>
  <div v-if="enabled" class="pointer-events-none fixed inset-0 z-[90] hidden md:block">
    <div
      class="absolute rounded-full border border-cyan-200/50 transition-[width,height,margin,opacity] duration-200"
      :class="isExpanded ? 'h-16 w-16 -ml-8 -mt-8 opacity-100' : 'h-8 w-8 -ml-4 -mt-4 opacity-90'"
      :style="{ left: `${outer.x}px`, top: `${outer.y}px` }"
    ></div>

    <div
      class="absolute h-2.5 w-2.5 -ml-[5px] -mt-[5px] rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(82,224,255,0.95)]"
      :style="{ left: `${inner.x}px`, top: `${inner.y}px` }"
    ></div>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';

const outer = reactive({ x: 0, y: 0 });
const inner = reactive({ x: 0, y: 0 });
const isExpanded = ref(false);
const enabled = ref(false);

let rafId = 0;
let targetX = 0;
let targetY = 0;

function handleMove(event) {
  targetX = event.clientX;
  targetY = event.clientY;
  inner.x = targetX;
  inner.y = targetY;
}

function handleOver(event) {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const interactive = target.closest('.cursor-hover, a, button, [role="button"]');
  isExpanded.value = Boolean(interactive);
}

function animate() {
  outer.x += (targetX - outer.x) * 0.17;
  outer.y += (targetY - outer.y) * 0.17;
  rafId = requestAnimationFrame(animate);
}

onMounted(() => {
  if (!window.matchMedia('(pointer: fine)').matches) return;

  enabled.value = true;
  window.addEventListener('pointermove', handleMove, { passive: true });
  window.addEventListener('pointerover', handleOver, { passive: true });
  rafId = requestAnimationFrame(animate);
});

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId);
  window.removeEventListener('pointermove', handleMove);
  window.removeEventListener('pointerover', handleOver);
});
</script>