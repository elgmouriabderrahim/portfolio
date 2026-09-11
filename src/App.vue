<template>
  <div class="scrollbar-thin min-h-screen text-slate-100">
    <CustomCursor />
    <BootScreen v-if="showBoot" @complete="showBoot = false" />
    <DesktopShell v-else />
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { profile } from '@/data/profile';
import CustomCursor from '@/components/ui/CustomCursor.vue';
import BootScreen from '@/components/os/BootScreen.vue';
import DesktopShell from '@/components/os/DesktopShell.vue';

const showBoot = ref(!sessionStorage.getItem('developer-os-booted'));

onMounted(() => {
  document.title = `${profile.name} — ${profile.title}`;
});
</script>
