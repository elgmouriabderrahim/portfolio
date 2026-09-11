<template>
  <div class="app-page experience-app"><div class="app-heading"><div><p class="eyebrow">CAREER SYSTEM LOG / 001</p><h2>Professional <em>experience.</em></h2></div><p class="lede compact">A focused record of hands-on work in a production-oriented web environment.</p></div>
    <article class="experience-card"><div class="experience-card__head"><div><p class="file-type">{{ experience.type }}</p><h3>{{ experience.role }}</h3><strong>{{ experience.company }}</strong></div><div class="experience-meta"><span>{{ experience.period }}</span><span>{{ experience.location }}</span></div></div>
      <p class="experience-summary">{{ experience.summary }}</p><div class="experience-grid"><section><p class="file-type">Key responsibilities</p><ul><li v-for="item in experience.responsibilities" :key="item">{{ item }}</li></ul></section><section><p class="file-type">Technology stack</p><div class="chips"><span v-for="technology in experience.technologies" :key="technology">{{ technology }}</span></div><p class="experience-outcome"><b>Outcome:</b> {{ experience.outcome }}</p></section></div>
    </article>
  </div>
</template>
<script setup>import { profile } from '@/data/profile'; const experience = profile.experience;</script>
