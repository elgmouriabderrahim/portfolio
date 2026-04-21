<template>
  <section id="skills" class="section-frame section-spacing">
    <div class="container-shell">
      <SectionHeading
        eyebrow="Skills"
        title="Capabilities, tools, and educational foundation."
        description="Presented as a clean editorial grid with improved rhythm and hierarchy."
      />

      <div ref="skillsWrap" class="grid gap-5 lg:grid-cols-12">
        <article
          data-reveal
          class="glass soft-glow relative overflow-hidden rounded-[2rem] border-white/10 p-6 lg:col-span-7 lg:p-8"
        >
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(82,224,255,0.12),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(168,85,247,0.12),transparent_28%)]"></div>
          <div class="relative">
            <p class="text-xs uppercase tracking-[0.35em] text-slate-300">Skills</p>
            <h3 class="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">Frontend, backend, database, and delivery.</h3>

            <div class="mt-6 grid gap-4 sm:grid-cols-2">
              <div class="rounded-3xl border border-white/10 bg-slate-950/50 p-4">
                <p class="text-[11px] uppercase tracking-[0.28em] text-slate-400">Frontend</p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span v-for="item in profile.skills.frontend" :key="item" class="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-100">{{ item }}</span>
                </div>
              </div>

              <div class="rounded-3xl border border-white/10 bg-slate-950/50 p-4">
                <p class="text-[11px] uppercase tracking-[0.28em] text-slate-400">Backend</p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span v-for="item in profile.skills.backend" :key="item" class="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-100">{{ item }}</span>
                </div>
              </div>

              <div class="rounded-3xl border border-white/10 bg-slate-950/50 p-4">
                <p class="text-[11px] uppercase tracking-[0.28em] text-slate-400">Database</p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span v-for="item in profile.skills.database" :key="item" class="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-100">{{ item }}</span>
                </div>
              </div>

              <div class="rounded-3xl border border-white/10 bg-slate-950/50 p-4">
                <p class="text-[11px] uppercase tracking-[0.28em] text-slate-400">Tools</p>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span v-for="item in profile.skills.tools.slice(0, 4)" :key="item" class="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-100">{{ item }}</span>
                </div>
              </div>
            </div>
          </div>
        </article>

        <article
          data-reveal
          class="glass relative overflow-hidden rounded-[2rem] border-white/10 p-6 lg:col-span-5 lg:row-span-2 lg:p-8"
        >
          <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(168,85,247,0.14),transparent_34%)]"></div>
          <div class="relative">
            <p class="text-xs uppercase tracking-[0.35em] text-slate-300">Education</p>
            <h3 class="mt-3 font-display text-2xl font-semibold text-white sm:text-3xl">Academic background</h3>

            <div class="mt-6 space-y-4">
              <div v-for="item in profile.timeline" :key="item.period + item.institution" class="rounded-3xl border border-white/10 bg-slate-950/45 p-4">
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <p class="text-[11px] uppercase tracking-[0.28em] text-slate-400">{{ item.period }}</p>
                    <h4 class="mt-2 text-base font-semibold text-white">{{ item.institution }}</h4>
                  </div>
                  <span class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-slate-300">{{ item.title }}</span>
                </div>
                <p class="mt-3 text-sm leading-6 text-slate-300">{{ item.details }}</p>
              </div>
            </div>
          </div>
        </article>

        <article data-reveal class="glass rounded-[2rem] border-white/10 p-6 lg:col-span-4">
          <p class="text-xs uppercase tracking-[0.35em] text-slate-300">Workflow</p>
          <h3 class="mt-3 text-xl font-semibold text-white">Professional stack</h3>
          <p class="mt-3 text-sm leading-6 text-slate-300">The tools and methodology used to keep delivery smooth, collaborative, and production-friendly.</p>
          <div class="mt-5 flex flex-wrap gap-2">
            <span v-for="item in profile.skills.methodology" :key="item" class="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-100">{{ item }}</span>
          </div>
        </article>

        <article data-reveal class="glass rounded-[2rem] border-white/10 p-6 lg:col-span-8">
          <p class="text-xs uppercase tracking-[0.35em] text-slate-400">Design</p>
          <div class="mt-4 grid gap-4 sm:grid-cols-2">
            <div class="rounded-3xl border border-white/10 bg-slate-950/45 p-4">
              <h4 class="text-sm font-semibold text-white">Visual tools</h4>
              <div class="mt-3 flex flex-wrap gap-2">
                <span v-for="item in profile.skills.design" :key="item" class="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-100">{{ item }}</span>
              </div>
            </div>
            <div class="rounded-3xl border border-white/10 bg-slate-950/45 p-4">
              <h4 class="text-sm font-semibold text-white">What it signals</h4>
              <p class="mt-3 text-sm leading-6 text-slate-300">Strong interface awareness, clean layout instincts, and production-ready UI polish.</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { profile } from '@/data/profile';
import { useRevealTimeline } from '@/animations/gsap';
import SectionHeading from '@/components/ui/SectionHeading.vue';

const skillsWrap = ref(null);
let cleanup = null;

onMounted(() => {
  cleanup = useRevealTimeline(skillsWrap.value, { stagger: 0.08 });
});

onBeforeUnmount(() => {
  if (cleanup) cleanup();
});
</script>