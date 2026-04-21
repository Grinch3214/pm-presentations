<template>
  <div class="slide__resources">
    <h2 class="slide__resources-subtitle subtitle">📚 {{ slide.title }}</h2>
    <ul class="slide__resources-list">
      <li
        v-for="(resource, index) in slide.resources"
        :key="index"
        class="slide__resources-item"
        v-html="resource"
      ></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import type { Slide } from '@/types/slider'

defineProps<{
  slide: Slide
}>()
</script>