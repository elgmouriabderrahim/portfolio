<template>
  <section ref="windowElement"
    v-show="!windowState.minimized"
    class="os-window"
    :class="{ 'is-active': active, 'is-maximized': windowState.maximized, 'is-interacting': interacting }"
    :style="windowStyle"
    :aria-label="`${title} application window`"
    @pointerdown="$emit('focus')" @focusin="$emit('focus')"
    @pointermove="updateInteraction" @pointerup="stopInteraction" @pointercancel="stopInteraction" @lostpointercapture="stopInteraction"
  >
    <header class="window-bar" @pointerdown="startDrag" @dblclick="$emit('maximize')">
      <span class="window-app-mark">ae.</span>
      <p>{{ title }} <span>— Abderrahim Elgmouri</span></p>
      <div class="window-controls" aria-label="Window controls" @dblclick.stop>
        <button aria-label="Minimize window" class="control minimize" @click.stop="$emit('minimize')">−</button>
        <button aria-label="Maximize window" class="control maximize" @click.stop="$emit('maximize')">{{ windowState.maximized ? '❐' : '□' }}</button>
        <button aria-label="Close window" class="control close" @click.stop="$emit('close')">×</button>
      </div>
    </header>
    <div class="window-body" :class="{ 'with-sidebar': showSidebar }"><nav v-if="showSidebar" class="window-sidebar" aria-label="Portfolio sections"><slot name="sidebar" /></nav><div class="window-content scrollbar-thin"><slot /></div></div>
    <template v-if="!windowState.maximized">
      <button v-for="edge in resizeEdges" :key="edge" class="window-resize-handle" :class="`resize-${edge}`"
        :aria-label="`Resize ${title} window from ${edgeNames[edge]}`" :tabindex="edge === 'se' ? 0 : -1"
        @pointerdown.stop.prevent="startResize($event, edge)" @keydown="resizeWithKeyboard($event, edge)"
      ></button>
    </template>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
const props = defineProps({ title: String, windowState: Object, active: Boolean, showSidebar: Boolean });
const emit = defineEmits(['focus', 'close', 'minimize', 'maximize', 'move', 'resize']);
const windowElement = ref(null);
const viewport = ref({ width: window.innerWidth, height: window.innerHeight });
const interacting = ref(false);
const resizeEdges = ['n', 'e', 's', 'w', 'ne', 'nw', 'se', 'sw'];
const edgeNames = { n: 'top', e: 'right', s: 'bottom', w: 'left', ne: 'top right', nw: 'top left', se: 'bottom right', sw: 'bottom left' };
let interaction = null;
const clamp = (value, min, max) => Math.min(Math.max(value, min), max);
const bounds = computed(() => ({ left: 80, top: 40, right: viewport.value.width - 8, bottom: viewport.value.height - 12 }));
const geometry = computed(() => {
  const b = bounds.value;
  const width = Math.min(props.windowState.width ?? Math.min(1040, viewport.value.width - 130), b.right - b.left);
  const height = Math.min(props.windowState.height ?? Math.min(700, viewport.value.height - (viewport.value.height <= 740 ? 95 : 140)), b.bottom - b.top);
  return { width, height, x: clamp(props.windowState.x, b.left, b.right - width), y: clamp(props.windowState.y, b.top, b.bottom - height) };
});
const windowStyle = computed(() => ({
  zIndex: props.windowState.zIndex,
  ...(!props.windowState.maximized && {
    '--window-x': `${geometry.value.x}px`, '--window-y': `${geometry.value.y}px`,
    '--window-width': `${geometry.value.width}px`, '--window-height': `${geometry.value.height}px`,
  }),
}));

function startInteraction(event, edge = null) {
  if (viewport.value.width <= 700 || props.windowState.maximized || event.button !== 0) return;
  stopInteraction();
  emit('focus');
  interaction = { pointerId: event.pointerId, element: event.currentTarget, pointerX: event.clientX, pointerY: event.clientY, ...geometry.value, edge };
  interacting.value = true;
  event.currentTarget.setPointerCapture(event.pointerId);
}
function startDrag(event) {
  if (event.target.closest('button')) return;
  startInteraction(event);
}
function startResize(event, edge) { startInteraction(event, edge); }
function resizedGeometry(start, dx, dy, edge) {
  const b = bounds.value;
  const minWidth = Math.min(480, b.right - b.left);
  const minHeight = Math.min(300, b.bottom - b.top);
  let { x, y, width, height } = start;
  if (edge.includes('e')) width = clamp(start.width + dx, minWidth, b.right - x);
  if (edge.includes('s')) height = clamp(start.height + dy, minHeight, b.bottom - y);
  if (edge.includes('w')) { x = clamp(start.x + dx, b.left, start.x + start.width - minWidth); width = start.x + start.width - x; }
  if (edge.includes('n')) { y = clamp(start.y + dy, b.top, start.y + start.height - minHeight); height = start.y + start.height - y; }
  return { x, y, width, height };
}
function updateInteraction(event) {
  if (!interaction || event.pointerId !== interaction.pointerId) return;
  const dx = event.clientX - interaction.pointerX;
  const dy = event.clientY - interaction.pointerY;
  if (interaction.edge) emit('resize', resizedGeometry(interaction, dx, dy, interaction.edge));
  else {
    const b = bounds.value;
    emit('move', { x: clamp(interaction.x + dx, b.left, b.right - interaction.width), y: clamp(interaction.y + dy, b.top, b.bottom - interaction.height) });
  }
}
function stopInteraction() {
  const previous = interaction;
  interaction = null;
  interacting.value = false;
  if (previous?.element.hasPointerCapture(previous.pointerId)) previous.element.releasePointerCapture(previous.pointerId);
}
function resizeWithKeyboard(event, edge) {
  if (!event.key.startsWith('Arrow') || viewport.value.width <= 700) return;
  event.preventDefault();
  const step = event.shiftKey ? 50 : 20;
  const dx = event.key === 'ArrowRight' ? step : event.key === 'ArrowLeft' ? -step : 0;
  const dy = event.key === 'ArrowDown' ? step : event.key === 'ArrowUp' ? -step : 0;
  emit('resize', resizedGeometry(geometry.value, dx, dy, edge));
}
function updateViewport() { stopInteraction(); viewport.value = { width: window.innerWidth, height: window.innerHeight }; }
watch(() => [props.windowState.maximized, props.windowState.minimized], stopInteraction);
onMounted(() => window.addEventListener('resize', updateViewport));
onBeforeUnmount(() => { stopInteraction(); window.removeEventListener('resize', updateViewport); });
</script>
