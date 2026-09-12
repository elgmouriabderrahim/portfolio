<template>
  <div class="app-page"><div class="app-heading"><div><p class="eyebrow">PACKAGE MANAGER</p><h2>Tech <em>Stack.</em></h2></div><p class="lede compact">The languages, frameworks, and tools I use to build products.</p></div>
    <div class="ecosystem"><article v-for="group in groups" :key="group.title" class="skill-orbit"><span class="orbit-index">{{ group.index }}</span><h3>{{ group.title }}</h3><ul class="package-list"><li v-for="skill in group.items" :key="skill"><span aria-hidden="true">▣</span>{{ skill }}</li></ul></article></div>
    <TechnologyPlayground />
  </div>
</template>
<script setup>
import TechnologyPlayground from '@/components/ui/TechnologyPlayground.vue';
import { profile } from '@/data/profile';
const groups = [{ index: '01', title: 'Backend', items: profile.skills.backend }, { index: '02', title: 'Frontend', items: profile.skills.frontend }, { index: '03', title: 'Database', items: profile.skills.database }, { index: '04', title: 'AI / Data', items: profile.skills.dataAi }, { index: '05', title: 'DevOps / Tools', items: profile.skills.tools }];
</script>
