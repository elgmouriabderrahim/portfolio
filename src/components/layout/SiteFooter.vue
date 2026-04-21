<template>
  <footer class="pb-8 pt-4">
    <div class="container-shell">
      <div class="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-center sm:flex-row sm:text-left">
        <p class="text-sm text-slate-400">© {{ year }} Abderrahim Elgmouri. Built with Vue, GSAP, Lenis, and Tailwind CSS.</p>
        <a href="#hero" class="text-sm font-medium text-slate-200 transition hover:text-white">Back to top</a>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear();
</script>