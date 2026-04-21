<template>
  <div class="hero slide__page">
    <div class="hero__content">
      <h1 class="hero__content-title">{{ slide.title }}</h1>
      <h2 class="hero__content-subtitle subtitle" v-if="slide.subtitle">
        {{ slide.subtitle }}
      </h2>
    </div>
    <SlideHeroAuthor v-if="slide.author" :author="slide.author" />
  </div>
</template>

<script setup lang="ts">
import type { Slide } from '@/types/slider'
import SlideHeroAuthor from './SlideHeroAuthor.vue'

defineProps<{
  slide: Slide
}>()
</script>

<style scoped lang="scss">
@use '../../assets/scss/_vars.scss' as v;

.hero {
  &__content {
    display: grid;
    align-content: end;
    gap: 20px;
    padding-top: 8vh;

    @include v.bp1200 {
      align-content: start;
      padding-top: 20vh;
    }
  }

  &__content-title {
    font-size: 30px;
    font-weight: 700;
    text-shadow: 0px 1px 8px var(--brand-color);

    @include v.bp992 {
      font-size: 40px;
    }

    @include v.bp1200 {
      font-size: 60px;
    }
  }

  &__content-subtitle {
    text-shadow: 0px 1px 8px var(--brand-color);
    letter-spacing: 1.2px;
  }
}
</style>