<template>
  <div class="slide__page slide__page--title">
    <!-- TODO: Need to refactor classes and use scoped -->
    <div class="slide__title-content">
      <h1 class="slide__page-title">{{ slide.title }}</h1>
      <h2 class="slide__page-subtitle subtitle" v-if="slide.subtitle">
        {{ slide.subtitle }}
      </h2>
    </div>

    <div class="slide__author" v-if="slide.author">
      <div class="slide__author-photo">
        <img v-if="slide.author.photo" :src="slide.author.photo" :alt="slide.author.name" />
      </div>
      <div class="slide__author-info">
        <p class="slide__author-name">{{ slide.author.name }}</p>
        <p class="slide__author-role">{{ slide.author.role }}</p>
        <p class="slide__author-exp">{{ slide.author.experience }}</p>
        <p>LinkedIn / GitHub</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Slide } from '@/types/slider'

const props = defineProps<{
  slide: Slide
}>()
</script>
