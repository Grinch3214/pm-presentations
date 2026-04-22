<template>
  <div class="slide__summary">
    <h2 class="slide__summary-subtitle subtitle">🎯 {{ slide.title }}</h2>
    <ul v-if="slide.bullets" class="bullets slide__summary-bullets">
      <li v-for="(bullet, index) in slide.bullets" :key="index" class="bullets__item">
        {{ bullet }}
      </li>
    </ul>
    <div v-if="slide.note" class="note slide__summary-note">💡 {{ slide.note }}</div>
  </div>
</template>

<script setup lang="ts">
import type { Slide } from '@/types/slider'

defineProps<{
  slide: Slide
}>()
</script>