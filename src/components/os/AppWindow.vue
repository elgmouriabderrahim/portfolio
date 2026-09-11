<template>
  <section ref="windowElement"
    v-show="!windowState.minimized"
    class="os-window"
    :class="{ 'is-active': active, 'is-maximized': windowState.maximized }"
    :style="windowStyle"
    :aria-label="`${title} application window`"
    @mousedown="$emit('focus')"
  >
    <header class="window-bar" @pointerdown="startDrag" @dblclick="$emit('maximize')">
      <div class="window-controls" aria-label="Window controls">
        <button aria-label="Close window" class="control close" @click.stop="$emit('close')"></button>
        <button aria-label="Minimize window" class="control minimize" @click.stop="$emit('minimize')"></button>
        <button aria-label="Maximize window" class="control maximize" @click.stop="$emit('maximize')"></button>
      </div>
      <p>{{ title }}</p>
      <span class="window-state">{{ windowState.maximized ? 'MAX' : 'APP' }}</span>
    </header>
    <div class="window-content scrollbar-thin"><slot /></div>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue';
const props = defineProps({ title: String, windowState: Object, active: Boolean });
const emit = defineEmits(['focus', 'close', 'minimize', 'maximize', 'move']);
const windowElement = ref(null);
let drag = null;
const windowStyle = computed(() => props.windowState.maximized ? {} : {
  zIndex: props.windowState.zIndex,
  '--window-x': `${props.windowState.x}px`,
  '--window-y': `${props.windowState.y}px`,
});

function startDrag(event) {
  if (props.windowState.maximized || event.button !== 0 || event.target.closest('button')) return;
  emit('focus');
  drag = { pointerX: event.clientX, pointerY: event.clientY, x: props.windowState.x, y: props.windowState.y };
  event.currentTarget.setPointerCapture?.(event.pointerId);
  event.currentTarget.addEventListener('pointermove', dragWindow);
  event.currentTarget.addEventListener('pointerup', stopDrag, { once: true });
  event.currentTarget.addEventListener('pointercancel', stopDrag, { once: true });
}

function dragWindow(event) {
  if (!drag) return;
  const element = windowElement.value;
  const width = element?.offsetWidth || 0;
  const height = element?.offsetHeight || 0;
  const x = Math.min(Math.max(8, drag.x + event.clientX - drag.pointerX), Math.max(8, window.innerWidth - width - 8));
  const y = Math.min(Math.max(52, drag.y + event.clientY - drag.pointerY), Math.max(52, window.innerHeight - height - 72));
  emit('move', { x, y });
}

function stopDrag(event) {
  drag = null;
  event.currentTarget.removeEventListener('pointermove', dragWindow);
}

onBeforeUnmount(() => { drag = null; });
</script>
