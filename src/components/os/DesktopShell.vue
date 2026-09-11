<template>
  <main class="developer-os">
    <ThreeHeroScene class="os-scene" />
    <div class="wallpaper-noise"></div>
    <header class="top-bar">
      <button class="system-name" @click="open('about')">AE <span>Developer OS</span></button>
      <p class="workspace-label">{{ activeTitle || 'Workspace' }}</p>
      <div class="system-status"><span class="status-dot"></span><span class="desktop-only">ONLINE</span><time>{{ clock }}</time></div>
    </header>

    <section class="desktop" aria-label="Developer OS applications">
      <div class="desktop-intro">
        <p class="eyebrow">PERSONAL WORKSPACE / 2026</p>
        <h1>Build systems.<br><em>Learn intelligence.</em></h1>
        <p>{{ profile.tagline }}</p>
      </div>
      <nav class="desktop-icons" aria-label="Applications">
        <button v-for="app in apps" :key="app.id" class="desktop-icon cursor-hover" @click="open(app.id)">
          <span class="app-symbol" :class="`symbol-${app.id}`">{{ app.symbol }}</span><span>{{ app.label }}</span>
        </button>
      </nav>
    </section>

    <AppWindow
      v-for="app in openApps" :key="app.id" :title="app.label" :window-state="windows[app.id]"
      :active="activeId === app.id" @focus="focus(app.id)" @close="close(app.id)" @minimize="minimize(app.id)" @maximize="maximize(app.id)" @move="move(app.id, $event)"
    >
      <AboutApp v-if="app.id === 'about'" />
      <ProjectsApp v-else-if="app.id === 'projects'" />
      <SkillsApp v-else-if="app.id === 'skills'" />
      <JourneyApp v-else-if="app.id === 'ai'" />
      <TerminalApp v-else-if="app.id === 'terminal'" />
      <GithubApp v-else-if="app.id === 'github'" />
      <ContactApp v-else-if="app.id === 'contact'" />
      <ExperienceApp v-else-if="app.id === 'experience'" />
      <EducationApp v-else-if="app.id === 'education'" />
      <BrowserApp v-else-if="app.id === 'browser'" />
    </AppWindow>

    <nav class="dock" aria-label="Quick launch dock">
      <button v-for="app in dockApps" :key="app.id" class="dock-item cursor-hover" :aria-label="`Open ${app.label}`" @click="open(app.id)">
        <span class="app-symbol">{{ app.symbol }}</span><i v-if="windows[app.id].open"></i>
      </button>
    </nav>
    <button class="palette-trigger" aria-label="Open command palette" @click="paletteOpen = true">⌘ <span>Command</span></button>
    <div v-if="paletteOpen" class="command-overlay" @click.self="paletteOpen = false">
      <div class="command-palette" role="dialog" aria-modal="true" aria-label="Command palette">
        <input ref="paletteInput" v-model="query" placeholder="Open an application…" aria-label="Search applications" @keydown.escape="paletteOpen = false" />
        <button v-for="app in filteredApps" :key="app.id" @click="openFromPalette(app.id)"><span class="app-symbol">{{ app.symbol }}</span>{{ app.label }}<kbd>↵</kbd></button>
      </div>
    </div>
  </main>
</template>

<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref, watch } from 'vue';
import { profile } from '@/data/profile';
import ThreeHeroScene from '@/components/sections/ThreeHeroScene.vue';
import AppWindow from './AppWindow.vue';
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

const apps = [
  { id: 'about', label: 'About Me', symbol: '◉' }, { id: 'projects', label: 'Projects', symbol: '▦' },
  { id: 'skills', label: 'Skills', symbol: '⌘' }, { id: 'experience', label: 'Experience', symbol: '◫' },
  { id: 'education', label: 'Education', symbol: '▤' },
  { id: 'ai', label: 'AI Journey', symbol: '✦' }, { id: 'terminal', label: 'Terminal', symbol: '>_' },
  { id: 'github', label: 'GitHub', symbol: '◌' }, { id: 'contact', label: 'Contact', symbol: '✉' },
  { id: 'browser', label: 'Browser', symbol: '◉' },
];
const dockApps = apps.filter((app) => ['projects', 'terminal', 'browser', 'github', 'ai', 'contact'].includes(app.id));
const windows = reactive(Object.fromEntries(apps.map((app, index) => [app.id, { open: false, minimized: false, maximized: false, x: 90 + (index % 3) * 42, y: 98 + (index % 2) * 28, zIndex: index + 2 }])));
const activeId = ref(null); const clock = ref(''); const paletteOpen = ref(false); const paletteInput = ref(null); const query = ref(''); let timer;
const openApps = computed(() => apps.filter((app) => windows[app.id].open));
const activeTitle = computed(() => apps.find((app) => app.id === activeId.value)?.label);
const filteredApps = computed(() => apps.filter((app) => app.label.toLowerCase().includes(query.value.toLowerCase())));
function focus(id) { activeId.value = id; windows[id].zIndex = Math.max(...Object.values(windows).map((window) => window.zIndex)) + 1; }
function open(id) { windows[id].open = true; windows[id].minimized = false; focus(id); }
function close(id) { windows[id].open = false; if (activeId.value === id) activeId.value = openApps.value.at(-1)?.id || null; }
function minimize(id) { windows[id].minimized = true; }
function maximize(id) { windows[id].maximized = !windows[id].maximized; focus(id); }
function move(id, position) { windows[id].x = position.x; windows[id].y = position.y; }
function openFromPalette(id) { paletteOpen.value = false; query.value = ''; open(id); }
function updateClock() { clock.value = new Intl.DateTimeFormat('en', { hour: '2-digit', minute: '2-digit' }).format(new Date()); }
function onKeydown(event) { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); paletteOpen.value = true; } }
watch(paletteOpen, (open) => { if (open) nextTick(() => paletteInput.value?.focus()); });
onMounted(() => { updateClock(); timer = window.setInterval(updateClock, 1000); window.addEventListener('keydown', onKeydown); });
onBeforeUnmount(() => { window.clearInterval(timer); window.removeEventListener('keydown', onKeydown); });
</script>
