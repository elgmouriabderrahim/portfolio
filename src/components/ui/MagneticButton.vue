<template>
  <component
    :is="tag"
    :href="href"
    :type="tag === 'button' ? type : undefined"
    class="magnetic cursor-hover group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-transform duration-200"
    :class="variantClasses"
    @mousemove="handleMove"
    @mouseleave="reset"
  >
    <slot>{{ label }}</slot>
    <span class="transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
  </component>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  label: { type: String, default: '' },
  href: { type: String, default: '' },
  type: { type: String, default: 'button' },
  variant: { type: String, default: 'primary' },
});

const tag = computed(() => (props.href ? 'a' : 'button'));

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'ghost':
      return 'border border-white/12 bg-white/5 text-white hover:bg-white/10';
    case 'outline':
      return 'border border-white/30 bg-white/8 text-white hover:border-white/60 hover:bg-white/14';
    default:
      return 'border border-white/25 bg-white text-black shadow-[0_16px_38px_rgba(255,255,255,0.16)] hover:bg-slate-100 hover:shadow-[0_20px_46px_rgba(255,255,255,0.22)]';
  }
});

function handleMove(event) {
  const target = event.currentTarget;
  if (!(target instanceof HTMLElement)) return;
  const rect = target.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
  const y = ((event.clientY - rect.top) / rect.height - 0.5) * 12;
  target.style.transform = `translate3d(${x}px, ${y}px, 0)`;
}

function reset(event) {
  const target = event.currentTarget;
  if (!(target instanceof HTMLElement)) return;
  target.style.transform = 'translate3d(0, 0, 0)';
}
</script>