<template>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path :d="paths[name] || paths.projects" />
  </svg>
</template>
<script setup>
defineProps({ name: String });
const paths = {
  files: 'M3 7V5a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z M3 10h18',
  calculator: 'M5 2h14v20H5Z M8 5h8v4H8Z M8 13h1m3 0h1m3 0h0 M8 17h1m3 0h1m3 0h0',
  resume: 'M5 2h9l5 5v15H5Z M14 2v6h5 M8 12h8 M8 16h8 M8 19h5',
  settings: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8 M10 2h4l1 3 3 1 3-1 2 4-2 2v3l2 2-2 4-3-1-3 1-1 3h-4l-1-3-3-1-3 1-2-4 2-2v-3L1 9l2-4 3 1 3-1 1-3Z',
  about: 'M20 21v-2a7 7 0 0 0-14 0v2 M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0',
  projects: 'M3 7V5a2 2 0 0 1 2-2h5l2 3h7a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z M3 10h18',
  skills: 'm8 6-6 6 6 6 m8-12 6 6-6 6 M14 3l-4 18',
  experience: 'M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2 M3 7h18v13H3Z M3 12l9 3 9-3 M12 12v4',
  education: 'm2 9 10-5 10 5-10 5-10-5 M6 11v6c4 3 8 3 12 0v-6 M22 9v8',
  ai: 'M12 2l3 7 7 3-7 3-3 7-3-7-7-3 7-3 3-7Z',
  terminal: 'm5 7 5 5-5 5 M13 17h6',
  github: 'M9 19c-5 2-5-3-7-3 M15 22v-4a4 4 0 0 0-1-3c4 0 7-2 7-6a5 5 0 0 0-1-3 5 5 0 0 0 0-4s-2 0-4 2a13 13 0 0 0-8 0C6 2 4 2 4 2a5 5 0 0 0 0 4 5 5 0 0 0-1 3c0 4 3 6 7 6a4 4 0 0 0-1 3v4',
  contact: 'M3 5h18v14H3Z m0 1 9 7 9-7',
  browser: 'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0 M2 12h20 M12 2c6 6 6 14 0 20-6-6-6-14 0-20',
};
</script>
