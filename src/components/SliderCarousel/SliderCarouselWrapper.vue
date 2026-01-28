<template>
  <Carousel v-bind="carouselConfig">
    <Slide v-for="slide in slideStore.slides" :key="slide.id">
      <SliderCarouselItem :slide="slide" />
    </Slide>

    <template #addons>
      <Pagination />
    </template>
  </Carousel>
</template>

<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import { ref } from 'vue'
import { Carousel, Slide, Pagination } from 'vue3-carousel'
import { useSlideStore } from '@/stores/slider'
import SliderCarouselItem from './SliderCarouselItem.vue'

const slideStore = useSlideStore()

const carouselConfig = {
  dir: 'ttb',
  itemsToShow: 1,
  mouseWheel: true,
  height: '100vh',
} as const
</script>

<style lang="scss">
.carousel {
  --vc-pgn-width: 20px;
  --vc-pgn-height: 20px;
  --vc-pgn-border-radius: 50%;

  &__viewport {
    background:
      linear-gradient(to top, rgba(0, 55, 138, 0.7), rgb(0 0 0 / 0.8)),
      url('/src/assets/img/offline-homepage-splash-1680@2x.webp') no-repeat center/cover;
  }

  &__pagination {
    align-items: center;
    counter-reset: slider;
  }

  &__pagination-item {
    & > .carousel__pagination-button {
      position: relative;

      &::before {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        counter-increment: slider;
        content: counter(slider);
        color: var(--white-color);
        font-size: 12px;
        pointer-events: none;
      }

      &--active {
        background: var(--secondary-brand-color);

        &::before {
          transform: translate(-50%, -50%) scale(1.5);
        }
      }
    }
  }

  &__pagination-button--active {
    --vc-pgn-width: 30px;
    --vc-pgn-height: 30px;
  }
}
</style>
