<template>
  <div class="slide__final">
    <h1 class="slide__final-title">{{ slide.title }}</h1>
    <h2 v-if="slide.subtitle" class="slide__final-subtitle subtitle">{{ slide.subtitle }}</h2>
    <div v-if="slide.note" class="slide__final-note note">{{ slide.note }}</div>
  </div>
</template>

<script setup lang="ts">
import type { Slide } from '@/types/slider'

defineProps<{
  slide: Slide
}>()
</script>