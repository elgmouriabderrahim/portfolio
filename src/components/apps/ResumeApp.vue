<template>
  <div class="resume-app">
    <div class="resume-toolbar">
      <span>CV · {{ profile.name }}</span>
      <div class="resume-actions">
        <button class="ubuntu-secondary" :class="{ 'resume-selected': selectedCv === 'ai' }" :aria-pressed="selectedCv === 'ai'" @click="selectedCv = 'ai'">AI CV</button>
        <button class="ubuntu-secondary" :class="{ 'resume-selected': selectedCv === 'dev' }" :aria-pressed="selectedCv === 'dev'" @click="selectedCv = 'dev'">Developer CV</button>
        <a class="ubuntu-secondary" :href="resumeUrl" target="_blank" rel="noopener noreferrer">Open PDF ↗</a>
        <a class="ubuntu-primary" :href="resumeUrl" :download="downloadName">Download {{ selectedCv === 'ai' ? 'AI' : 'Developer' }} CV ↓</a>
      </div>
    </div>
    <object class="resume-pdf" :data="resumeUrl" type="application/pdf" :aria-label="`${profile.name} CV`">
      <div class="resume-fallback">
        <AppIcon name="resume" />
        <h2>CV preview is unavailable</h2>
        <p>Your browser cannot display the PDF inside this window.</p>
        <a class="ubuntu-primary" :href="resumeUrl" target="_blank" rel="noopener noreferrer">Open the CV</a>
      </div>
    </object>
  </div>
</template>
<script setup>
import { computed, ref } from 'vue';
import { profile } from '@/data/profile';
import AppIcon from '@/components/ui/AppIcon.vue';
import aiResumeUrl from '@/assets/images/cv/elgmouri-abderrahim-cv-ai.pdf?url';
import devResumeUrl from '@/assets/images/cv/elgmouri-abderrahim-cv-dev.pdf?url';

const selectedCv = ref('ai');
const resumeUrl = computed(() => selectedCv.value === 'ai' ? aiResumeUrl : devResumeUrl);
const downloadName = computed(() => `Elgmouri-Abderrahim-CV-${selectedCv.value.toUpperCase()}.pdf`);
</script>
