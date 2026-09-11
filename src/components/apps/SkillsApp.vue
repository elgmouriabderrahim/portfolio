<template>
  <div class="app-page"><div class="app-heading"><div><p class="eyebrow">SYSTEM CAPABILITIES</p><h2>Skill <em>ecosystem.</em></h2></div><p class="lede compact">A practical toolkit, organized by the systems it helps build—not artificial proficiency scores.</p></div>
    <div class="ecosystem"><article v-for="group in groups" :key="group.title" class="skill-orbit"><span class="orbit-index">{{ group.index }}</span><h3>{{ group.title }}</h3><div class="chips"><span v-for="skill in group.items" :key="skill">{{ skill }}</span></div></article></div>
    <section ref="playground" class="tech-playground" aria-label="Technology chase game"><div><p class="eyebrow">INTERACTIVE SANDBOX</p><h3>Catch a <em>technology.</em></h3><p>Click a label before it escapes to a new spot.</p></div><button v-for="(technology, index) in gameTechnologies" :key="technology.name" class="tech-runner" :style="runnerStyle(technology)" @click="escape(index)">{{ technology.name }}</button></section>
  </div>
</template>
<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';
import { profile } from '@/data/profile';
const groups = [{ index: '01', title: 'Backend', items: profile.skills.backend }, { index: '02', title: 'Frontend', items: profile.skills.frontend }, { index: '03', title: 'Databases', items: profile.skills.database }, { index: '04', title: 'Data / AI foundations', items: profile.skills.dataAi }, { index: '05', title: 'Tools / Infrastructure', items: profile.skills.tools }];
const playground = ref(null);
const gameTechnologies = ref(['Docker', 'Figma', 'Python', 'Laravel', 'Vue', 'React', 'FastAPI', 'PostgreSQL'].map((name, index) => ({ name, x: 14 + (index % 4) * 21, y: 34 + Math.floor(index / 4) * 38 })));
function runnerStyle(technology) { return { transform: `translate(${technology.x}px, ${technology.y}px)` }; }
function escape(index) { const area = playground.value; if (!area) return; const technology = gameTechnologies.value[index]; const maxX = Math.max(12, area.clientWidth - 115); const maxY = Math.max(75, area.clientHeight - 45); technology.x = Math.round(Math.random() * maxX); technology.y = Math.round(62 + Math.random() * (maxY - 62)); }
function resetPositions() { gameTechnologies.value.forEach((_, index) => escape(index)); }
onMounted(() => { resetPositions(); window.addEventListener('resize', resetPositions); });
onBeforeUnmount(() => window.removeEventListener('resize', resetPositions));
</script>
