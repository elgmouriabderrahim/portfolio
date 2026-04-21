<template>
  <section id="contact" class="section-frame section-spacing pb-20">
    <div ref="contactWrap" class="container-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
      <div>
        <SectionHeading
          eyebrow="Contact"
          title="Open to meaningful collaborations and ambitious product builds."
          :description="profile.contact.note"
        />

        <div class="space-y-4">
          <GlassCard>
            <p data-reveal class="text-xs uppercase tracking-[0.3em] text-slate-300">Direct</p>
            <div class="mt-4 space-y-3 text-sm text-slate-200">
              <a :href="`mailto:${profile.email}`" class="block transition hover:text-white">{{ profile.email }}</a>
              <a :href="`tel:${profile.phone.replace(/\s+/g, '')}`" class="block transition hover:text-white">{{ profile.phone }}</a>
              <p>Discord: {{ profile.discord }}</p>
              <p>{{ profile.location }}</p>
            </div>
          </GlassCard>

          <div class="grid gap-4 sm:grid-cols-2">
            <a data-reveal :href="profile.github" target="_blank" rel="noreferrer" class="glass rounded-3xl p-5 transition hover:border-white/35 hover:bg-white/10">
              <p class="text-xs uppercase tracking-[0.3em] text-slate-400">GitHub</p>
              <p class="mt-3 text-base font-semibold text-white">Repository activity</p>
            </a>
            <a data-reveal :href="profile.linkedin" target="_blank" rel="noreferrer" class="glass rounded-3xl p-5 transition hover:border-white/35 hover:bg-white/10">
              <p class="text-xs uppercase tracking-[0.3em] text-slate-400">LinkedIn</p>
              <p class="mt-3 text-base font-semibold text-white">Professional profile</p>
            </a>
          </div>
        </div>
      </div>

      <GlassCard>
        <form data-reveal class="grid gap-4" @submit.prevent="handleSubmit">
          <div class="grid gap-4 sm:grid-cols-2">
            <label class="grid gap-2">
              <span class="text-xs uppercase tracking-[0.25em] text-slate-400">Name</span>
              <input v-model="form.name" required class="rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-white/30" placeholder="Your name" />
            </label>
            <label class="grid gap-2">
              <span class="text-xs uppercase tracking-[0.25em] text-slate-400">Email</span>
              <input v-model="form.email" type="email" required class="rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-white/30" placeholder="you@company.com" />
            </label>
          </div>

          <label class="grid gap-2">
            <span class="text-xs uppercase tracking-[0.25em] text-slate-400">Subject</span>
            <input v-model="form.subject" required class="rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-white/30" placeholder="Project inquiry" />
          </label>

          <label class="grid gap-2">
            <span class="text-xs uppercase tracking-[0.25em] text-slate-400">Message</span>
            <textarea v-model="form.message" rows="6" required class="rounded-2xl border border-white/10 bg-slate-950/55 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-white/30" placeholder="Tell me about the project, timeline, and scope."></textarea>
          </label>

          <div class="flex flex-wrap items-center gap-4">
            <MagneticButton type="submit">Send Email</MagneticButton>
            <p class="text-sm text-slate-400">This opens your mail client with the message prefilled.</p>
          </div>
        </form>
      </GlassCard>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, reactive, ref } from 'vue';
import { profile } from '@/data/profile';
import { useRevealTimeline } from '@/animations/gsap';
import SectionHeading from '@/components/ui/SectionHeading.vue';
import GlassCard from '@/components/ui/GlassCard.vue';
import MagneticButton from '@/components/ui/MagneticButton.vue';

const contactWrap = ref(null);
let cleanup = null;

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
});

function handleSubmit() {
  const subject = encodeURIComponent(form.subject || `Portfolio inquiry from ${form.name}`);
  const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`);
  window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
}

onMounted(() => {
  cleanup = useRevealTimeline(contactWrap.value, { stagger: 0.07 });
});

onBeforeUnmount(() => {
  if (cleanup) cleanup();
});
</script>