<template>
  <header class="fixed inset-x-0 top-0 z-40">
    <div class="container-shell pt-4">
      <div class="glass flex items-center justify-between rounded-full px-4 py-3 sm:px-6">
        <a href="#hero" class="group flex items-center gap-3 font-display text-sm font-semibold tracking-[0.18em] text-white sm:text-base">
          <span class="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-white text-black">AE</span>
          <span class="hidden sm:block">Abderrahim Elgmouri</span>
        </a>

        <nav class="hidden items-center gap-2 md:flex">
          <a v-for="item in links" :key="item.label" :href="item.href" class="rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/8 hover:text-white">
            {{ item.label }}
          </a>
        </nav>

        <a href="#contact" class="rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/20">
          Contact
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
const links = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
];
</script>