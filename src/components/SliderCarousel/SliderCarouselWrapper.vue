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

<style lang="scss"></style>
