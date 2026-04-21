<template>
  <Transition name="fade">
    <div v-if="project" class="fixed inset-0 z-50 bg-slate-950/92 backdrop-blur-2xl" @click.self="emit('close')">
      <div ref="modalRoot" class="relative h-full w-full overflow-y-auto scrollbar-thin">
        <div class="mx-auto min-h-full w-full max-w-6xl px-4 pb-14 pt-8 sm:px-6 lg:px-8 lg:pt-10">
          <button class="cursor-hover fixed right-6 top-6 z-50 rounded-full border border-white/12 bg-black/45 px-4 py-2 text-sm text-slate-200 transition hover:bg-white/10" @click="emit('close')">
            Close
          </button>

          <section class="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03]">
            <div class="relative h-80 overflow-hidden sm:h-96">
              <img :src="project.image" :alt="project.title" loading="lazy" class="h-full w-full object-cover" />
              <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90"></div>
              <div class="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-10">
                <p class="text-xs uppercase tracking-[0.34em] text-slate-300">Project Hero</p>
                <h3 class="mt-3 font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">{{ project.title }}</h3>
                <p class="mt-4 max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">{{ project.description }}</p>
                <div class="mt-5 flex flex-wrap gap-2">
                  <span v-for="stack in project.techStack" :key="stack" class="rounded-full border border-white/15 bg-black/35 px-3 py-1.5 text-xs text-slate-100">{{ stack }}</span>
                </div>
              </div>
            </div>
          </section>

          <section class="mt-8 grid gap-6 lg:grid-cols-2">
            <article data-detail class="glass rounded-3xl p-6 sm:p-8">
              <p class="text-xs uppercase tracking-[0.32em] text-slate-300">Problem</p>
              <p class="mt-4 text-sm leading-7 text-slate-200 sm:text-base">{{ project.problem || 'A real operational problem solved through product-focused engineering decisions.' }}</p>
            </article>

            <article data-detail class="glass rounded-3xl p-6 sm:p-8">
              <p class="text-xs uppercase tracking-[0.32em] text-slate-300">Solution</p>
              <p class="mt-4 text-sm leading-7 text-slate-200 sm:text-base">{{ project.solution || 'Built with layered architecture, strong domain logic, and maintainable implementation patterns.' }}</p>
            </article>

            <article data-detail class="glass rounded-3xl p-6 sm:p-8 lg:col-span-2">
              <p class="text-xs uppercase tracking-[0.32em] text-slate-300">Features</p>
              <ul class="mt-5 grid gap-3 sm:grid-cols-2">
                <li v-for="feature in (project.features?.length ? project.features : fallbackFeatures)" :key="feature" class="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-200">
                  {{ feature }}
                </li>
              </ul>
            </article>

            <article data-detail class="glass rounded-3xl p-6 sm:p-8">
              <p class="text-xs uppercase tracking-[0.32em] text-slate-300">Tech Stack</p>
              <div class="mt-4 flex flex-wrap gap-2">
                <span v-for="stack in project.techStack" :key="stack" class="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-cyan-100">{{ stack }}</span>
              </div>
            </article>

            <article data-detail class="glass rounded-3xl p-6 sm:p-8">
              <p class="text-xs uppercase tracking-[0.32em] text-slate-300">Links</p>
              <a :href="project.github || profile.github" target="_blank" rel="noreferrer" class="cursor-hover mt-4 inline-flex items-center rounded-2xl border border-white/30 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/20">
                View GitHub Repository
              </a>
            </article>
          </section>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { nextTick, ref, watch } from 'vue';
import { gsap } from '@/animations/gsap';
import { profile } from '@/data/profile';

const props = defineProps({
  project: { type: Object, default: null },
});

const emit = defineEmits(['close']);
const modalRoot = ref(null);

const fallbackFeatures = [
  'High-performance architecture',
  'Secure access and authorization flow',
  'Clean, modular code organization',
  'Production-oriented delivery approach',
];

watch(
  () => props.project,
  async (value) => {
    if (!value) return;
    await nextTick();

    if (!modalRoot.value) return;

    gsap.fromTo(
      modalRoot.value.querySelectorAll('[data-detail]'),
      { y: 32, opacity: 0, filter: 'blur(8px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      },
    );
  },
);
</script>