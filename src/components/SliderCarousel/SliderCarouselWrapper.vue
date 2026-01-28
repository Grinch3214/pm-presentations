<template>
  <Carousel v-bind="carouselConfig">
    <Slide v-for="slide in 10" :key="slide">
      <SliderCarouselItem :slide="slide" />
    </Slide>

    <template #addons>
      <Navigation />
      <Pagination />
    </template>
  </Carousel>
</template>

<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import SliderCarouselItem from './SliderCarouselItem.vue'

const carouselConfig = {
  itemsToShow: 2.5,
  wrapAround: true,
}
</script>
