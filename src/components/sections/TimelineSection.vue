<template>
  <section id="experience" class="section-frame section-spacing">
    <div class="container-shell">
      <SectionHeading
        eyebrow="Experience"
        title="A focused learning path behind product delivery."
        description="Timeline view with cleaner spacing and a restrained editorial style."
      />

      <div ref="timelineWrap" class="relative pl-4 sm:pl-6">
        <div class="absolute left-[18px] top-0 h-full w-px bg-gradient-to-b from-white/70 via-white/30 to-transparent sm:left-[22px]"></div>
        <TimelineItem v-for="item in profile.timeline" :key="item.institution + item.period" :item="item" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { profile } from '@/data/profile';
import { useRevealTimeline } from '@/animations/gsap';
import SectionHeading from '@/components/ui/SectionHeading.vue';
import TimelineItem from '@/components/ui/TimelineItem.vue';

const timelineWrap = ref(null);
let cleanup = null;

onMounted(() => {
  cleanup = useRevealTimeline(timelineWrap.value, { stagger: 0.14 });
});

onBeforeUnmount(() => {
  if (cleanup) cleanup();
});
</script>