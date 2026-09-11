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
const input = ref(null);
const command = ref('');
const output = ref(['Developer OS terminal — type help to explore.']);
const answers = {
  help: 'Commands: about, skills, projects, experience, education, ai, github, contact, whoami, pwd, ls, neofetch, clear',
  about: 'Abderrahim Elgmouri — Full-Stack Developer and AI Engineering Student at YouCode.',
  skills: 'Python · PHP/Laravel · JavaScript · Vue · React · PostgreSQL · MySQL · Docker',
  projects: '11 documented projects are available in the Projects application.',
  experience: 'Open Experience for the i-gouvernancia Full-Stack Web Development internship.',
  education: 'YouCode — AI Engineering Student. Faculty of Safi — SMI.',
  ai: 'Learned: Python, NumPy, Pandas. Current direction: ML → Deep Learning → AI Engineering.',
  github: 'github.com/elgmouriabderrahim',
  contact: 'ea.officialbox@gmail.com · Safi, Morocco',
  whoami: 'visitor', pwd: '/home/abderrahim/developer-os', ls: 'about.txt  projects/  skills/  ai-journey/  contact.txt',
  neofetch: 'Abderrahim@DeveloperOS\nRole: Full-Stack Developer\nEducation: AI Engineering @ YouCode\nFocus: Backend + AI\nLanguages: Python, JavaScript, PHP\nFrameworks: Vue, React, Laravel\nDatabase: PostgreSQL, MySQL\nOS: Linux',
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
