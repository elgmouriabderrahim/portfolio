<template>
  <div class="scrollbar-thin relative min-h-screen text-slate-100">
    <CustomCursor />

    <SiteHeader />

    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection @select="openProject" />
      <TimelineSection />
      <ContactSection />
    </main>

    <SiteFooter />
    <ProjectModal :project="selectedProject" @close="closeProject" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { profile } from '@/data/profile';
import { gsap } from '@/animations/gsap';
import { useLenis } from '@/composables/useLenis';
import { useProjectModal } from '@/composables/useProjectModal';
import SiteHeader from '@/components/layout/SiteHeader.vue';
import SiteFooter from '@/components/layout/SiteFooter.vue';
import CustomCursor from '@/components/ui/CustomCursor.vue';
import HeroSection from '@/components/sections/HeroSection.vue';
import AboutSection from '@/components/sections/AboutSection.vue';
import SkillsSection from '@/components/sections/SkillsSection.vue';
import ProjectsSection from '@/components/sections/ProjectsSection.vue';
import TimelineSection from '@/components/sections/TimelineSection.vue';
import ContactSection from '@/components/sections/ContactSection.vue';
import ProjectModal from '@/components/ui/ProjectModal.vue';

useLenis();
const { selectedProject, openProject, closeProject } = useProjectModal();

onMounted(() => {
  document.title = `${profile.name} — ${profile.title}`;

  gsap.utils.toArray('main > section').forEach((section) => {
    gsap.fromTo(
      section,
      { y: 42, opacity: 0.35 },
      {
        y: 0,
        opacity: 1,
        duration: 0.95,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 88%',
          once: true,
        },
      },
    );
  });
});
</script>