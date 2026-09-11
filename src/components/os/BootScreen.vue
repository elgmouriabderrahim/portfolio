<template>
  <main class="boot-screen" aria-label="Developer OS booting">
    <div class="boot-terminal">
      <p class="boot-mark">AE / DEVELOPER OS</p>
      <p v-for="line in visibleLines" :key="line" class="boot-line"><span>✓</span> {{ line }}</p>
      <p class="boot-cursor">_</p>
      <button class="boot-skip" @click="complete">Skip intro</button>
    </div>
  </main>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const emit = defineEmits(['complete']);
const lines = ['Booting workspace', 'Loading project archive', 'Initializing AI journey', 'Welcome, visitor.'];
const visibleLines = ref([]);
let timer;

function complete() {
  sessionStorage.setItem('developer-os-booted', 'true');
  emit('complete');
}

onMounted(() => {
  let index = 0;
  timer = window.setInterval(() => {
    visibleLines.value.push(lines[index]);
    index += 1;
    if (index === lines.length) {
      window.clearInterval(timer);
      window.setTimeout(complete, 450);
    }
  }, 220);
});
onBeforeUnmount(() => window.clearInterval(timer));
</script>
