<template>
  <div class="slide__example">
    <h2 class="slide__example-subtitle subtitle">💡 {{ slide.title }}</h2>

    <div class="slide__example-header">
      <h3 class="slide__example-title">{{ slide.example!.title }}</h3>
      <p class="slide__example-description">{{ slide.example!.description }}</p>
    </div>

    <div class="slide__example-items">
      <template v-for="(item, index) in slide.example!.items" :key="index">
        <hr v-if="item === '---'" class="divider" />
        <p v-else class="slide__example-item">{{ item }}</p>
      </template>
    </div>

    <button v-if="slide.exampleItem === 'button'" class="slide__example-button">Example</button>

    <div class="slide__example-conclusion">
      <strong class="slide__example-strong">✨ Висновок:</strong>
      <p class="slide__example-desc">{{ slide.example!.conclusion }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Slide } from '@/types/slider'

defineProps<{
  slide: Slide
}>()
</script>