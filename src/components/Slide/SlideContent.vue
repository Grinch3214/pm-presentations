<template>
  <div class="slide__content">
    <h2 class="slide__content-subtitle subtitle">{{ slide.title }}</h2>
    <ul v-if="slide.bullets" class="slide__content-bullets bullets">
      <li v-for="(bullet, index) in slide.bullets" :key="index" class="bullets__item">
        {{ bullet }}
      </li>
    </ul>
    <div v-if="slide.examples" class="slide__content-examples examples">
      <p v-for="(example, index) in slide.examples" :key="index" class="examples__item">
        {{ example }}
      </p>
    </div>
    <div v-if="slide.note" class="slide__content-note note">💡 {{ slide.note }}</div>
  </div>
</template>

<script setup lang="ts">
import type { Slide } from '@/types/slider'

defineProps<{
  slide: Slide
}>()
</script>