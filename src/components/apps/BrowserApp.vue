<template>
  <section class="browser-app">
    <form class="browser-toolbar" novalidate @submit.prevent="navigate">
      <button type="button" aria-label="Go back" :disabled="historyIndex === 0" @click="goBack">←</button>
      <button type="button" aria-label="Go forward" :disabled="historyIndex >= history.length - 1" @click="goForward">→</button>
      <button type="button" aria-label="Reload page" @click="reload">↻</button>
      <input v-model="address" type="text" inputmode="url" autocapitalize="none" autocorrect="off" spellcheck="false" aria-label="Website address" placeholder="example.com or https://example.com" @focus="$event.target.select()" />
      <button class="browser-go" type="submit">Go</button>
      <a :href="currentUrl" target="_blank" rel="noopener noreferrer" title="Open in your browser">↗</a>
    </form>
    <p v-if="error" class="browser-message">{{ error }}</p>
    <p v-else class="browser-message">Enter any website, such as <b>github.com</b>. If a website blocks embedding, use ↗ to open it in your browser.</p>
    <div class="browser-frame-wrap">
      <iframe :key="frameKey" :src="currentUrl" title="Embedded web browser" sandbox="allow-forms allow-modals allow-popups allow-scripts allow-same-origin" @load="loaded = true"></iframe>
      <span v-if="!loaded" class="browser-loading">Loading…</span>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
const initialUrl = 'https://example.com/';
const address = ref(initialUrl); const currentUrl = ref(initialUrl); const history = ref([initialUrl]);
const historyIndex = ref(0); const frameKey = ref(0); const loaded = ref(false); const error = ref('');
function normaliseUrl(value) { const candidate = value.trim(); if (!candidate) return null; const withProtocol = /^https?:\/\//i.test(candidate) ? candidate : `https://${candidate}`; try { const url = new URL(withProtocol); return ['http:', 'https:'].includes(url.protocol) ? url.href : null; } catch { return null; } }
function navigate() { const url = normaliseUrl(address.value); if (!url) { error.value = 'Enter a valid http or https website address.'; return; } error.value = ''; history.value = history.value.slice(0, historyIndex.value + 1); history.value.push(url); historyIndex.value += 1; load(url); }
function load(url) { address.value = url; currentUrl.value = url; loaded.value = false; frameKey.value += 1; }
function goBack() { if (historyIndex.value > 0) { historyIndex.value -= 1; load(history.value[historyIndex.value]); } }
function goForward() { if (historyIndex.value < history.value.length - 1) { historyIndex.value += 1; load(history.value[historyIndex.value]); } }
function reload() { loaded.value = false; frameKey.value += 1; }
</script>
