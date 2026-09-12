<template>
  <div class="welcome-app">
    <div class="welcome-breadcrumb"><span>Home</span><span>/</span> About me <span class="welcome-version">Personal portfolio</span></div>
    <div class="welcome-profile">
      <img class="profile-photo" :src="profilePhoto" :alt="`${profile.name} profile photo`" />
      <p class="welcome-overline">HELLO, WORLD.</p>
      <h2>I'm Abderrahim<span>.</span></h2>
      <p class="welcome-role">{{ profile.title }}</p>
      <p class="welcome-description">Based in {{ profile.location }}. I build dependable web applications, care about clean backend architecture, and study the foundations of artificial intelligence.</p>
      <div class="profile-facts">
        <span><small>LOCATION</small>{{ profile.location }}</span>
        <span><small>ROLE</small>Full-Stack & AI</span>
        <span><small>PROGRAMMING LANGUAGES</small>Python · PHP · JavaScript</span>
      </div>
      <div class="welcome-actions"><button class="ubuntu-primary" @click="$emit('open', 'projects')"><AppIcon name="projects" /> View projects</button><button class="ubuntu-secondary" @click="$emit('open', 'contact')">Get in touch <span>↗</span></button></div>
    </div>
    <div class="welcome-section-label">EXPLORE THE WORKSPACE</div>
    <div class="welcome-links">
      <button @click="$emit('open', 'skills')"><AppIcon name="skills" /><span><strong>Tools & technologies</strong><small>Python, Laravel, Vue, PostgreSQL</small></span><b>›</b></button>
      <button @click="$emit('open', 'ai')"><AppIcon name="ai" /><span><strong>My AI journey</strong><small>Learning, building, moving forward</small></span><b>›</b></button>
    </div>
    <footer class="welcome-footer"><span><i class="status-dot"></i> Open to collaboration</span><span>Made with Vue & curiosity</span></footer>
  </div>
</template>
<script setup>
import { profile } from '@/data/profile';
import AppIcon from '@/components/ui/AppIcon.vue';
import profilePhoto from '@/assets/images/profile/github-avatar.png';
defineEmits(['open']);
</script>
