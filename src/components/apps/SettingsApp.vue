<template><div class="app-page settings-app"><p class="eyebrow">DESKTOP PREFERENCES</p><h2>Settings</h2><p class="lede">Make this workspace feel like yours. Preferences are saved in this browser.</p>
  <fieldset><legend>Appearance</legend><div class="settings-options"><button v-for="theme in themes" :key="theme.id" :aria-pressed="desktopSettings.theme === theme.id" @click="desktopSettings.theme = theme.id"><span class="theme-swatch" :class="theme.id"></span>{{ theme.label }}</button></div></fieldset>
  <fieldset><legend>Wallpaper</legend><div class="settings-options"><button v-for="wallpaper in wallpapers" :key="wallpaper.id" :aria-pressed="desktopSettings.wallpaper === wallpaper.id" @click="desktopSettings.wallpaper = wallpaper.id">{{ wallpaper.label }}</button></div></fieldset>
  <label class="settings-toggle"><span><strong>Animations</strong><small>Window transitions, hover effects, and the technology chase game. Your system’s reduced-motion preference takes priority.</small></span><input v-model="desktopSettings.animations" type="checkbox" /></label>
  <label class="settings-toggle"><span><strong>Desktop shortcuts</strong><small>Show your files and application shortcuts on the wallpaper.</small></span><input v-model="desktopSettings.shortcuts" type="checkbox" /></label>
  <button class="ubuntu-secondary" @click="resetDesktopSettings">Restore defaults</button>
</div></template>
<script setup>
import { desktopSettings, resetDesktopSettings } from '@/composables/useDesktopSettings';
const themes = [{id:'aubergine',label:'Ubuntu · warm'}, {id:'graphite',label:'Graphite · cool'}];
const wallpapers = [{id:'image',label:'Give me a break'}, {id:'gradient',label:'Aubergine gradient'}, {id:'plain',label:'Solid black'}];
</script>
