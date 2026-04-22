<template>
  <div class="slide__warning">
    <h2 class="slide__warning-subtitle subtitle">⚠️ {{ slide.title }}</h2>
    <ul v-if="slide.bullets" class="slide__warning-bullets bullets">
      <li v-for="(bullet, index) in slide.bullets" :key="index" class="bullets__item">
        {{ bullet }}
      </li>
    </ul>
    <div v-if="slide.result" class="slide__warning-result result">
      <strong class="result__strong">⚡ Наслідок:</strong> {{ slide.result }}
    </div>
    <div v-if="slide.note" class="slide__warning-note note">💡 {{ slide.note }}</div>
  </div>
</template>

<script setup lang="ts">
import type { Slide } from '@/types/slider'

defineProps<{
  slide: Slide
}>()
</script>