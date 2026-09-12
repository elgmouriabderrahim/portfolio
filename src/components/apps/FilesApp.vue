<template><div class="files-app">
  <div class="files-toolbar"><button :disabled="!path.length" aria-label="Up one folder" @click="up">↑</button><button @click="go([])">Home</button><template v-for="(part,index) in path" :key="index"><span>/</span><button @click="go(path.slice(0,index+1))">{{ part }}</button></template><input v-if="path.length < 2" v-model="search" placeholder="Search this folder…" aria-label="Search files" /></div>
  <div v-if="project" class="file-preview"><p class="eyebrow">README.md</p><h2>{{ project.title }}</h2><img v-if="project.image" :src="project.image" :alt="`${project.title} preview`" /><p>{{ project.description }}</p><div class="chips"><span v-for="tech in project.techStack" :key="tech">{{ tech }}</span></div><div class="file-actions"><a v-if="project.github" :href="project.github" target="_blank" rel="noopener noreferrer" class="ubuntu-primary">Open repository ↗</a><a v-if="project.live" :href="project.live" target="_blank" rel="noopener noreferrer" class="ubuntu-secondary">Open project ↗</a></div></div>
  <div v-else class="file-grid"><button v-for="entry in filteredEntries" :key="entry.name" class="file-entry" @click="activate(entry)"><AppIcon :name="entry.icon" /><strong>{{ entry.name }}</strong><small>{{ entry.detail }}</small></button><p v-if="!filteredEntries.length" class="files-empty">No files match “{{ search }}”.</p></div>
  <footer class="files-status">{{ project ? 'README.md · Project overview' : `${filteredEntries.length} items` }}<span>Personal workspace</span></footer>
</div></template>
<script setup>
import { computed, ref } from 'vue';
import { projects } from '@/data/projects';
import AppIcon from '@/components/ui/AppIcon.vue';
const emit=defineEmits(['open']);const path=ref([]);const search=ref('');
const portfolio={id:'portfolio',title:'Portfolio',description:'An interactive Linux-inspired portfolio with draggable, resizable apps, a terminal, project folders, and a technology chase game.',techStack:['Vue.js','Vite','CSS','JavaScript'],live: new URL(import.meta.env.BASE_URL,window.location.origin).href};
const allProjects=[...projects,portfolio];
const project=computed(()=>path.value[0]==='Projects' && path.value[1] ? allProjects.find(item=>item.title===path.value[1]) : null);
const entries=computed(()=>!path.value.length ? [{name:'Projects',icon:'files',detail:`${allProjects.length} folders`,folder:true},{name:'Documents',icon:'files',detail:'Resume & background',folder:true},{name:'About me',icon:'about',detail:'Profile',app:'about'}] : path.value[0]==='Projects' ? allProjects.map(item=>({name:item.title,icon:'files',detail:item.category || 'Full-Stack',folder:true})) : [{name:'Resume.pdf',icon:'resume',detail:'CV / Resume',app:'resume'},{name:'Experience',icon:'experience',detail:'Work history',app:'experience'},{name:'Education',icon:'education',detail:'Learning history',app:'education'}]);
const filteredEntries=computed(()=>entries.value.filter(item=>item.name.toLowerCase().includes(search.value.toLowerCase())));
function go(next){path.value=next;search.value='';}function up(){go(path.value.slice(0,-1));}function activate(entry){if(entry.app)emit('open',entry.app);else go([...path.value,entry.name]);}
</script>
