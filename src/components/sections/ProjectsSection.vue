<template>
  <section id="projects" class="section-frame section-spacing overflow-hidden">
    <div class="container-shell">
      <SectionHeading
        eyebrow="Projects"
        title="Selected Projects"
        description="Cinematic horizontal flow inspired by modern agency case-study presentation. All 11 projects are included."
      />

      <div class="mb-5 flex items-center justify-end gap-2">
        <button
          class="cursor-hover rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-200 transition hover:bg-white/12"
          @click="slidePrev"
        >
          Prev
        </button>
        <button
          class="cursor-hover rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.28em] text-slate-200 transition hover:bg-white/12"
          @click="slideNext"
        >
          Next
        </button>
      </div>

      <div ref="projectsWrap" class="projects-rail flex gap-5 overflow-x-auto pb-4">
        <article
          v-for="project in projects"
          :key="project.id"
          data-reveal
          class="project-snap-card cursor-hover group min-w-[84vw] overflow-hidden rounded-[1.8rem] border border-white/12 bg-black/45 sm:min-w-[70vw] lg:min-w-[58vw] xl:min-w-[48vw]"
          @click="emit('select', project)"
        >
          <div class="relative h-[54vw] max-h-[420px] min-h-[280px] overflow-hidden">
            <img
              :src="project.image"
              :alt="project.title"
              loading="lazy"
              class="project-media h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-b from-black/10 via-black/35 to-black/85"></div>
          </div>

          <div class="space-y-4 p-6 sm:p-8">
            <p class="text-xs uppercase tracking-[0.3em] text-slate-300">Project {{ project.id.toString().padStart(2, '0') }}</p>
            <h3 class="max-w-4xl font-display text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">{{ project.title }}</h3>
            <p class="max-w-3xl text-sm leading-7 text-slate-300 sm:text-base">{{ project.description }}</p>

            <div class="flex flex-wrap gap-2">
              <span
                v-for="stack in project.techStack.slice(0, 5)"
                :key="stack"
                class="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-slate-100"
              >
                {{ stack }}
              </span>
            </div>

            <div class="inline-flex items-center gap-2 text-sm font-semibold text-white transition group-hover:translate-x-1">
              Open Full Project
              <span>→</span>
            </div>
          </div>
        </article>
      </div>

      <div class="mt-16 flex items-end justify-between gap-6">
        <div>
          <p class="text-xs uppercase tracking-[0.3em] text-slate-300">GitHub</p>
          <h3 class="mt-3 font-display text-2xl font-bold text-white sm:text-3xl">Additional repositories</h3>
        </div>
        <p class="max-w-xl text-sm leading-7 text-slate-300">Fetched directly from the GitHub API for live repository discovery and freshness.</p>
      </div>

      <div class="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <template v-if="loading">
          <div v-for="n in 3" :key="n" class="glass min-h-48 rounded-3xl p-6">
            <div class="h-4 w-24 animate-pulse rounded-full bg-white/10"></div>
            <div class="mt-6 h-8 w-3/4 animate-pulse rounded-full bg-white/10"></div>
            <div class="mt-4 h-4 w-full animate-pulse rounded-full bg-white/10"></div>
            <div class="mt-3 h-4 w-5/6 animate-pulse rounded-full bg-white/10"></div>
          </div>
        </template>

        <template v-else>
          <a
            v-for="repo in repos"
            :key="repo.id"
            :href="repo.url"
            target="_blank"
            rel="noreferrer"
            class="cursor-hover group glass rounded-3xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/35 hover:bg-white/10"
          >
            <div class="flex items-start justify-between gap-4">
              <div>
                <p class="text-xs uppercase tracking-[0.3em] text-slate-300">{{ repo.language || 'Repository' }}</p>
                <h4 class="mt-2 text-xl font-semibold text-white">{{ repo.name }}</h4>
              </div>
              <span class="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-slate-200">★ {{ repo.stars }}</span>
            </div>
            <p class="mt-4 text-sm leading-6 text-slate-300">{{ repo.description || 'A public repository showcasing ongoing work.' }}</p>
            <div class="mt-5 flex flex-wrap gap-2" v-if="repo.topics.length">
              <span v-for="topic in repo.topics.slice(0, 3)" :key="topic" class="rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs text-slate-200">{{ topic }}</span>
            </div>
            <div class="mt-6 flex items-center justify-between border-t border-white/10 pt-4 text-xs uppercase tracking-[0.28em] text-slate-400">
              <span>Updated {{ formatDate(repo.updatedAt) }}</span>
              <span class="text-white transition-transform duration-300 group-hover:translate-x-1">Open</span>
            </div>
          </a>

          <div v-if="!repos.length" class="glass rounded-3xl p-6 text-sm text-slate-300 sm:col-span-2 xl:col-span-3">
            GitHub repositories are currently unavailable.
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { projects } from '@/data/projects';
import { gsap } from '@/animations/gsap';
import { fetchGitHubRepos } from '@/services/github';
import { useRevealTimeline } from '@/animations/gsap';
import SectionHeading from '@/components/ui/SectionHeading.vue';

const emit = defineEmits(['select']);

const projectsWrap = ref(null);
const repos = ref([]);
const loading = ref(true);
let cleanup = null;
let wheelHandler = null;

const featuredNames = new Set(projects.map((project) => project.title.toLowerCase()));

const formatDate = (value) => new Intl.DateTimeFormat('en', { month: 'short', year: 'numeric' }).format(new Date(value));

function slideNext() {
  if (!projectsWrap.value) return;
  projectsWrap.value.scrollBy({ left: projectsWrap.value.clientWidth * 0.82, behavior: 'smooth' });
}

function slidePrev() {
  if (!projectsWrap.value) return;
  projectsWrap.value.scrollBy({ left: -projectsWrap.value.clientWidth * 0.82, behavior: 'smooth' });
}

onMounted(async () => {
  cleanup = useRevealTimeline(projectsWrap.value, { stagger: 0.08 });

  const projectCtx = gsap.context(() => {
    gsap.utils.toArray('.project-media').forEach((media) => {
      gsap.fromTo(
        media,
        { scale: 1.04, yPercent: -6 },
        {
          scale: 1,
          yPercent: 6,
          ease: 'none',
          scrollTrigger: {
            trigger: media.closest('article'),
            scrub: true,
            start: 'left right',
            end: 'right left',
            horizontal: true,
            scroller: projectsWrap.value,
          },
        },
      );
    });
  }, projectsWrap);

  if (projectsWrap.value) {
    wheelHandler = (event) => {
      if (window.innerWidth < 1024) return;
      if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;
      event.preventDefault();
      projectsWrap.value.scrollLeft += event.deltaY * 0.75;
    };
    projectsWrap.value.addEventListener('wheel', wheelHandler, { passive: false });
  }

  try {
    const githubRepos = await fetchGitHubRepos('elgmouriabderrahim');
    repos.value = githubRepos.filter((repo) => !featuredNames.has(repo.name.toLowerCase())).slice(0, 6);
  } catch (error) {
    repos.value = [];
  } finally {
    loading.value = false;
  }

  const previousCleanup = cleanup;
  cleanup = () => {
    previousCleanup();
    projectCtx.revert();
  };
});

onBeforeUnmount(() => {
  if (projectsWrap.value && wheelHandler) {
    projectsWrap.value.removeEventListener('wheel', wheelHandler);
  }
  if (cleanup) cleanup();
});
</script>