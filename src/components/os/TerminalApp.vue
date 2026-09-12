<template>
  <div class="terminal-app" @click="input?.focus()">
    <div class="terminal-output" aria-live="polite">
      <p v-for="(line, index) in output" :key="index" :class="{ command: line.startsWith('›') }">{{ line }}</p>
    </div>
    <form @submit.prevent="runCommand">
      <label><span>visitor@developer-os:~$</span><input ref="input" v-model="command" autocomplete="off" aria-label="Terminal command" /></label>
    </form>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue';
import { projects } from '@/data/projects';
import { profile } from '@/data/profile';
const input = ref(null);
const command = ref('');
const output = ref([`${profile.name} — ${profile.title}`, `${profile.location} · Welcome to my workspace.`, 'Type help to explore my work.']);
const answers = {
  help: 'Commands: about, role, skills, projects, experience, education, ai, github, contact, whoami, pwd, ls, neofetch, clear',
  about: `${profile.name} — ${profile.title}.\n${profile.bio[0]}\n${profile.tagline}`,
  role: profile.title,
  skills: 'Python · PHP/Laravel · JavaScript · Vue · React · PostgreSQL · MySQL · Docker',
  projects: projects.map(project => `${project.title} — ${project.github}`).join('\n'),
  experience: 'Open Experience for the i-gouvernancia Full-Stack Web Development internship.',
  education: profile.timeline.map(item => `${item.institution} — ${item.title} (${item.period})`).join('\n'),
  ai: 'Learned: Python, NumPy, Pandas. Current direction: ML → Deep Learning → AI Engineering.',
  github: 'github.com/elgmouriabderrahim',
  contact: `${profile.email}\n${profile.linkedin}\n${profile.github}`,
  whoami: `${profile.name} — ${profile.title}`, pwd: '/home/abderrahim/developer-os', ls: 'about.txt  projects/  skills/  ai-journey/  contact.txt',
  neofetch: `Abderrahim@DeveloperOS\nRole: ${profile.title}\nEducation: AI Engineering @ YouCode\nFocus: Backend + AI\nLanguages: Python, JavaScript, PHP\nFrameworks: Vue, React, Laravel\nDatabase: PostgreSQL, MySQL\nOS: Linux`,
};
function runCommand() {
  const value = command.value.trim().toLowerCase();
  if (!value) return;
  output.value.push(`› ${command.value}`);
  if (value === 'clear') output.value = [];
  else output.value.push(answers[value] || `command not found: ${value}. Type help.`);
  command.value = '';
  nextTick(() => input.value?.focus());
}
</script>
