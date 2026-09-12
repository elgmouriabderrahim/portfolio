<template>
  <main class="developer-os" :data-theme="desktopSettings.theme" :data-wallpaper="desktopSettings.wallpaper" :data-animations="desktopSettings.animations">
    <div class="linux-wallpaper" aria-hidden="true"></div>
    <header class="top-bar">
      <div class="top-left"><button class="activities-button" @click="paletteOpen = !paletteOpen"><span class="workspace-dots"><i></i><i></i><i></i></span> Activities</button><span class="current-app">{{ activeTitle || 'Desktop' }}</span></div>
      <time class="system-clock">{{ clock }}</time>
      <div class="system-status"><span class="desktop-only">{{ profile.name }}</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-label="Connected"><path d="M2 8a16 16 0 0 1 20 0M5 12a11 11 0 0 1 14 0M9 16a5 5 0 0 1 6 0"/><circle cx="12" cy="20" r="1" fill="currentColor"/></svg><span class="status-dot"></span></div>
    </header>
    <section class="desktop" aria-label="Portfolio desktop">
      <h1 class="sr-only">{{ profile.name }} — {{ profile.title }}</h1>
      <nav v-if="desktopSettings.shortcuts" class="desktop-shortcuts" aria-label="Desktop shortcuts">
        <button v-for="app in desktopApps" :key="app.id" class="desktop-icon" @click="open(app.id)"><span class="app-symbol" :class="`symbol-${app.id}`"><AppIcon :name="app.id" /></span><span>{{ app.label }}</span></button>
      </nav>
      <button class="desktop-hint" @click="paletteOpen = true"><kbd>Ctrl</kbd> + <kbd>K</kbd><span>Find an application</span></button>
    </section>
    <div class="windows-layer">

    <AppWindow
      v-for="app in openApps" :key="app.id" :title="app.label" :window-state="windows[app.id]"
      :active="activeId === app.id" :show-sidebar="!['terminal', 'browser', 'calculator', 'files', 'resume'].includes(app.id)" @focus="focus(app.id)" @close="close(app.id)" @minimize="minimize(app.id)" @maximize="maximize(app.id)" @move="move(app.id, $event)" @resize="resize(app.id, $event)"
    >
      <template #sidebar>
        <p class="sidebar-heading">PORTFOLIO</p>
        <button v-for="item in apps.filter((item) => !['terminal', 'browser', 'calculator'].includes(item.id))" :key="item.id" :class="{ selected: item.id === app.id }" @click="open(item.id)"><AppIcon :name="item.id" />{{ item.label }}</button>
        <div class="sidebar-footer"><span class="status-dot"></span> Available for collaboration</div>
      </template>
      <AboutApp v-if="app.id === 'about'" @open="open" />
      <ProjectsApp v-else-if="app.id === 'projects'" />
      <SkillsApp v-else-if="app.id === 'skills'" />
      <JourneyApp v-else-if="app.id === 'ai'" />
      <TerminalApp v-else-if="app.id === 'terminal'" />
      <GithubApp v-else-if="app.id === 'github'" />
      <ContactApp v-else-if="app.id === 'contact'" />
      <ExperienceApp v-else-if="app.id === 'experience'" />
      <EducationApp v-else-if="app.id === 'education'" />
      <BrowserApp v-else-if="app.id === 'browser'" />
      <FilesApp v-else-if="app.id === 'files'" @open="open" />
      <CalculatorApp v-else-if="app.id === 'calculator'" />
      <ResumeApp v-else-if="app.id === 'resume'" />
      <SettingsApp v-else-if="app.id === 'settings'" />
    </AppWindow>
    </div>

    <nav class="dock" aria-label="Quick launch dock">
      <button v-for="app in dockApps" :key="app.id" class="dock-item" :class="{ 'dock-active': activeId === app.id }" :aria-label="`Open ${app.label}`" @click="open(app.id)">
        <span class="app-symbol" :class="`symbol-${app.id}`"><AppIcon :name="app.id" /></span><span class="dock-tooltip">{{ app.label }}</span><i v-if="windows[app.id].open"></i>
      </button>
      <button class="dock-item show-apps" aria-label="Show applications" @click="paletteOpen = !paletteOpen"><span class="apps-grid-icon"><i v-for="n in 9" :key="n"></i></span><span class="dock-tooltip">Show applications</span></button>
    </nav>
    <div v-if="paletteOpen" class="command-overlay" @click.self="paletteOpen = false">
      <div class="command-palette" role="dialog" aria-modal="true" aria-label="Command palette">
        <input ref="paletteInput" v-model="query" placeholder="Open an application…" aria-label="Search applications" @keydown.enter.prevent="filteredApps[0] && openFromPalette(filteredApps[0].id)" @keydown.escape="paletteOpen = false" />
        <button v-for="app in filteredApps" :key="app.id" @click="openFromPalette(app.id)"><span class="app-symbol"><AppIcon :name="app.id" /></span>{{ app.label }}<kbd>↵</kbd></button>
        <p v-if="!filteredApps.length" class="palette-empty">No applications found. Try “files”, “calculator”, or “contact”.</p>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { profile } from '@/data/profile';
import AppWindow from './AppWindow.vue';
import AppIcon from '@/components/ui/AppIcon.vue';
import TerminalApp from './TerminalApp.vue';
import AboutApp from '@/components/apps/AboutApp.vue';
import ProjectsApp from '@/components/apps/ProjectsApp.vue';
import SkillsApp from '@/components/apps/SkillsApp.vue';
import JourneyApp from '@/components/apps/JourneyApp.vue';
import GithubApp from '@/components/apps/GithubApp.vue';
import ContactApp from '@/components/apps/ContactApp.vue';
import ExperienceApp from '@/components/apps/ExperienceApp.vue';
import EducationApp from '@/components/apps/EducationApp.vue';
import BrowserApp from '@/components/apps/BrowserApp.vue';
import FilesApp from '@/components/apps/FilesApp.vue';
import CalculatorApp from '@/components/apps/CalculatorApp.vue';
import ResumeApp from '@/components/apps/ResumeApp.vue';
import SettingsApp from '@/components/apps/SettingsApp.vue';
import { desktopSettings } from '@/composables/useDesktopSettings';

const apps = [
  { id: 'about', label: 'About Me' }, { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Tech Stack' }, { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'ai', label: 'AI Journey' }, { id: 'terminal', label: 'Terminal' },
  { id: 'github', label: 'GitHub' }, { id: 'contact', label: 'Contact' },
  { id: 'browser', label: 'Browser' },
  { id: 'files', label: 'Files' }, { id: 'calculator', label: 'Calculator' },
  { id: 'resume', label: 'CV / Resume' }, { id: 'settings', label: 'Settings' },
];
const dockApps = apps.filter((app) => ['about', 'files', 'terminal', 'browser', 'calculator', 'settings'].includes(app.id));
const desktopApps = apps.filter((app) => ['files', 'resume', 'contact'].includes(app.id));
const windows = reactive(Object.fromEntries(apps.map((app, index) => [app.id, { open: false, minimized: false, maximized: false, width: null, height: null, x: 90 + (index % 3) * 42, y: 98 + (index % 2) * 28, zIndex: index + 2 }])));
const activeId = ref(null); const clock = ref(''); const paletteOpen = ref(false); const paletteInput = ref(null); const query = ref(''); let timer;
const openApps = computed(() => apps.filter((app) => windows[app.id].open));
const activeTitle = computed(() => apps.find((app) => app.id === activeId.value)?.label);
const filteredApps = computed(() => apps.filter((app) => `${app.label} ${app.id}`.toLowerCase().includes(query.value.toLowerCase())));
function focus(id) { activeId.value = id; windows[id].zIndex = Math.max(...Object.values(windows).map((window) => window.zIndex)) + 1; }
function open(id) {
  if (!windows[id]) return;
  if (!windows[id].open) {
    if (id === 'calculator' && !windows[id].width) {
      windows[id].width = 550;
      windows[id].height = 590;
    }
    const width = Math.min(windows[id].width || 1040, window.innerWidth - 130);
    const height = Math.min(windows[id].height || 700, window.innerHeight - 140);
    windows[id].x = Math.max(84, 72 + (window.innerWidth - 72 - width) / 2);
    windows[id].y = Math.max(60, (window.innerHeight - height) / 2);
  }
  windows[id].open = true;
  windows[id].minimized = false;
  focus(id);
}
function focusTopWindow() { const next = openApps.value.filter((app) => !windows[app.id].minimized).sort((a, b) => windows[b.id].zIndex - windows[a.id].zIndex)[0]; activeId.value = next?.id || null; }
function close(id) { windows[id].open = false; if (activeId.value === id) focusTopWindow(); }
function minimize(id) { windows[id].minimized = true; if (activeId.value === id) focusTopWindow(); }
function maximize(id) { windows[id].maximized = !windows[id].maximized; focus(id); }
function resize(id, geometry) { Object.assign(windows[id], geometry); }
function move(id, position) { windows[id].x = position.x; windows[id].y = position.y; }
function openFromPalette(id) { paletteOpen.value = false; query.value = ''; open(id); }
function updateClock() { clock.value = new Intl.DateTimeFormat('en', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date()); }
function onKeydown(event) { if (event.key === 'Escape') paletteOpen.value = false; if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); paletteOpen.value = true; } }
watch(paletteOpen, (open) => { if (open) nextTick(() => paletteInput.value?.focus()); });
onMounted(() => { open('about'); updateClock(); timer = window.setInterval(updateClock, 1000); window.addEventListener('keydown', onKeydown); });
onBeforeUnmount(() => { window.clearInterval(timer); window.removeEventListener('keydown', onKeydown); });
</script>
