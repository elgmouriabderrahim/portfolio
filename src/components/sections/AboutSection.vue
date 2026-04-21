<template>
  <section id="about" class="section-frame section-spacing">
    <div class="container-shell">
      <SectionHeading
        eyebrow="About"
        title="Engineering with clarity, structure, and long-term maintainability."
        description="A minimal overview of how product thinking, backend reliability, and frontend precision come together."
      />

      <div ref="aboutWrap" class="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <GlassCard>
          <div class="space-y-5 text-sm leading-8 text-slate-300 sm:text-base">
            <p v-for="line in profile.bio" :key="line" data-reveal>{{ line }}</p>
          </div>
        </GlassCard>

        <div class="grid gap-6">
          <div data-reveal class="glass rounded-3xl p-7">
            <p class="text-xs uppercase tracking-[0.3em] text-slate-300">Strengths</p>
            <ul class="mt-4 space-y-3 text-sm text-slate-200">
              <li v-for="item in strengthPoints" :key="item" class="flex gap-3">
                <span class="mt-2 h-1.5 w-1.5 rounded-full bg-white"></span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>

          <div data-reveal class="glass rounded-3xl p-7">
            <p class="text-xs uppercase tracking-[0.3em] text-slate-300">Contact</p>
            <div class="mt-4 space-y-3 text-sm text-slate-200">
              <a class="block transition hover:text-white" :href="`mailto:${profile.email}`">{{ profile.email }}</a>
              <a class="block transition hover:text-white" :href="`tel:${profile.phone.replace(/\s+/g, '')}`">{{ profile.phone }}</a>
              <p>{{ profile.location }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { profile } from '@/data/profile';
import { useRevealTimeline } from '@/animations/gsap';
import SectionHeading from '@/components/ui/SectionHeading.vue';
import GlassCard from '@/components/ui/GlassCard.vue';

const aboutWrap = ref(null);
let cleanup = null;
const strengthPoints = [
  'Backend architecture with a strong focus on maintainability and security.',
  'Responsive, polished interfaces that feel premium without sacrificing usability.',
  'Thoughtful data modeling and performance tuning across SQL-backed products.',
  'Reliable collaboration habits with clear communication and delivery discipline.',
];

onMounted(() => {
  cleanup = useRevealTimeline(aboutWrap.value);
});

onBeforeUnmount(() => {
  if (cleanup) cleanup();
});
</script>