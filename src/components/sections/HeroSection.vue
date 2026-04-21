<template>
  <section id="hero" class="relative min-h-[96vh] overflow-hidden pt-28 sm:pt-32">
    <div class="absolute inset-0 -z-20 mesh-gradient"></div>
    <div class="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,0.12),transparent_60%)]"></div>
    <div class="absolute inset-0 -z-10 noise"></div>

    <div class="container-shell relative grid min-h-[calc(100vh-7rem)] items-end gap-12 pb-8 lg:grid-cols-[1.2fr_0.8fr]">
      <div ref="heroContent" class="max-w-4xl pb-8 lg:pb-14">
        <p class="mb-7 inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium uppercase tracking-[0.34em] text-slate-200">
          <span class="h-2 w-2 rounded-full bg-white"></span>
          Safi, Morocco · Available for selected projects
        </p>

        <h1 class="font-display text-[2.6rem] font-bold leading-[0.9] tracking-[-0.03em] text-white sm:text-[3.5rem] md:text-[4.4rem] lg:text-[5.4rem] xl:text-[6.3rem]">
          <span class="block overflow-hidden">
            <span ref="nameLine" class="inline-block text-gradient">Abderrahim</span>
          </span>
          <span class="block overflow-hidden">
            <span class="inline-block">Elgmouri</span>
          </span>
        </h1>

        <p ref="tagline" class="mt-7 max-w-3xl text-base leading-8 text-slate-300 sm:text-lg sm:leading-9">
          Full-stack engineer crafting premium digital products with clean backend architecture, cinematic interfaces, and reliable performance.
        </p>

        <div ref="ctaRow" class="mt-10 flex flex-wrap gap-4">
          <MagneticButton href="#projects">View Work</MagneticButton>
          <MagneticButton href="#contact" variant="ghost">Start a Project</MagneticButton>
        </div>
      </div>

      <div data-reveal class="glass soft-glow mb-8 rounded-[2rem] p-6 lg:mb-16">
        <p class="text-[11px] uppercase tracking-[0.32em] text-slate-400">Core Focus</p>
        <div class="mt-5 space-y-4 text-sm text-slate-200">
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span>Role</span>
            <span class="font-semibold text-white">Full-Stack Developer</span>
          </div>
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span>Backend</span>
            <span class="font-semibold text-white">Laravel · APIs · SQL</span>
          </div>
          <div class="flex items-center justify-between border-b border-white/10 pb-3">
            <span>Frontend</span>
            <span class="font-semibold text-white">Vue · Tailwind · GSAP</span>
          </div>
          <div class="flex items-center justify-between pb-1">
            <span>Contact</span>
            <a :href="`mailto:${profile.email}`" class="font-semibold text-white transition hover:opacity-70">{{ profile.email }}</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { profile } from '@/data/profile';
import { gsap } from '@/animations/gsap';
import MagneticButton from '@/components/ui/MagneticButton.vue';

const heroContent = ref(null);
const nameLine = ref(null);
const tagline = ref(null);
const ctaRow = ref(null);
let cleanup = null;

onMounted(() => {
  cleanup = gsap.context(() => {
    gsap.from(nameLine.value, { yPercent: 120, duration: 1.1, ease: 'power4.out' });
    gsap.from(tagline.value, { y: 24, opacity: 0, duration: 0.9, delay: 0.3, ease: 'power3.out' });
    gsap.from(ctaRow.value.children, {
      y: 20,
      opacity: 0,
      duration: 0.75,
      delay: 0.5,
      stagger: 0.1,
      ease: 'power3.out',
    });
    gsap.from(heroContent.value.querySelectorAll('[data-reveal]'), {
      y: 20,
      opacity: 0,
      duration: 0.8,
      delay: 0.65,
      ease: 'power3.out',
    });

    gsap.to('.mesh-gradient', {
      backgroundPosition: '100% 40%',
      duration: 18,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    });
  }, heroContent);
});

onBeforeUnmount(() => {
  if (cleanup) cleanup.revert();
});
</script>