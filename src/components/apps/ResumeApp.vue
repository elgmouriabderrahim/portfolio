<template>
  <div class="resume-app">
    <div class="resume-toolbar">
      <span>CV · {{ profile.name }}</span>
      <div class="resume-actions">
        <a class="ubuntu-secondary" :href="resumeUrl" target="_blank" rel="noopener noreferrer">Open PDF ↗</a>
        <a class="ubuntu-primary" :href="resumeUrl" download="Elgmouri-Abderrahim-CV.pdf">Download CV ↓</a>
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
import { profile } from '@/data/profile';
import AppIcon from '@/components/ui/AppIcon.vue';
import resumeUrl from '@/assets/images/cv/elgmouri-abderrahim-cv.pdf?url';
</script>
