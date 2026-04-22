<template>
  <div class="slide__checklist">
    <h2 class="slide__checklist-subtitle subtitle">✅ {{ slide.title }}</h2>
    <ul class="slide__checklist-list">
      <li v-for="(item, index) in slide.checklist" :key="index" class="slide__checklist-item">
        {{ item }}
      </li>
    </ul>
    <div v-if="slide.note" class="slide__checklist-note note">💡 {{ slide.note }}</div>
  </div>
</template>

<script setup lang="ts">
import type { Slide } from '@/types/slider'

defineProps<{
  slide: Slide
}>()
</script>