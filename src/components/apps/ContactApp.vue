<template><div class="app-page contact-app"><div class="app-hero"><p class="eyebrow">MAIL / NEW MESSAGE</p><h2>Let’s make<br><em>useful things.</em></h2><p class="lede">Available for freelance, remote collaboration, and product teams that value quality and ownership.</p></div><div class="contact-layout"><form class="contact-form" @submit.prevent="compose"><label>Your name<input v-model.trim="form.name" required autocomplete="name" placeholder="Your name" /></label><label>Your email<input v-model.trim="form.email" required type="email" autocomplete="email" placeholder="you@example.com" /></label><label>Message<textarea v-model.trim="form.message" required rows="5" placeholder="Tell me about your idea…"></textarea></label><button class="ubuntu-primary" type="submit">Compose email ↗</button><p role="status" aria-live="polite">{{ status }}</p></form><div><div class="contact-links"><a :href="`mailto:${profile.email}`"><span>EMAIL</span><strong>{{ profile.email }}</strong><i>↗</i></a><a :href="profile.linkedin" target="_blank" rel="noreferrer"><span>LINKEDIN</span><strong>Professional profile</strong><i>↗</i></a><a :href="profile.github" target="_blank" rel="noreferrer"><span>GITHUB</span><strong>Repository activity</strong><i>↗</i></a></div><p class="contact-location">{{ profile.location }} · {{ profile.phone }}</p></div></div></div></template>
<script setup>
import { reactive, ref } from 'vue';
import { profile } from '@/data/profile';
const form = reactive({ name: '', email: '', message: '' });
const status = ref('');
function compose() {
  const subject = encodeURIComponent(`Portfolio message from ${form.name}`);
  const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name}\nEmail: ${form.email}`);
  status.value = 'Opening your email app with this message…';
  window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
}
</script>
