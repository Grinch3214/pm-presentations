<template>
  <main>
    <CanvasBackground v-if="isDesktop" />
    <SlidersCarousel />
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import CanvasBackground from './components/CanvasBackground.vue'
import SlidersCarousel from './components/SliderCarousel/SliderCarouselWrapper.vue'

const BREAKPOINT = 1200
const isDesktop = ref(window.innerWidth >= BREAKPOINT)

const handleResize = () => {
  isDesktop.value = window.innerWidth >= BREAKPOINT
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>
