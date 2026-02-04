<template>
  <Carousel v-bind="carouselConfig" @slide-start="handleSlideStart">
    <Slide v-for="slide in slideStore.slides" :key="slide.id">
      <SliderCarouselItem :slide="slide" />
    </Slide>

    <template #addons>
      <div class="custom-progress"></div>
      <div class="custom-count">{{ currentSlideIndex + 1 }} / {{ slideStore.totalSlides }}</div>
    </template>
  </Carousel>
</template>

<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import { ref, onMounted } from 'vue'
import { Carousel, Slide } from 'vue3-carousel'
import { useSlideStore } from '@/stores/slider'
import SliderCarouselItem from './SliderCarouselItem.vue'

interface CarouselData {
  currentSlideIndex: number
  prevSlideIndex: number
  slidesCount: number
  slidingToIndex: number
}

const slideStore = useSlideStore()

const STORAGE_KEY = 'carousel-current-slide' as string

const currentSlideIndex = ref<number>(loadSavedSlideIndex())

const carouselConfig = {
  dir: 'ttb',
  itemsToShow: 1,
  mouseWheel: true,
  height: '100vh',
  modelValue: currentSlideIndex.value,
} as const

function loadSavedSlideIndex(): number {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    if (saved !== null) {
      const index = parseInt(saved, 10)
      if (!isNaN(index) && index >= 0 && index < slideStore.totalSlides) {
        return index
      }
    }
  } catch (error) {
    console.error(error)
  }
  return 0
}

function saveSlideIndex(index: number): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, index.toString())
  } catch (error) {
    console.error(error)
  }
}

function handleSlideStart(data: CarouselData) {
  currentSlideIndex.value = data.slidingToIndex

  saveSlideIndex(currentSlideIndex.value)

  const total = slideStore.totalSlides
  const progress = total <= 1 ? 0 : (currentSlideIndex.value / (total - 1)) * 100

  document.documentElement.style.setProperty('--progress', progress.toFixed(2))
}

onMounted(() => {
  const total = slideStore.totalSlides
  const progress = total <= 1 ? 0 : (currentSlideIndex.value / (total - 1)) * 100
  document.documentElement.style.setProperty('--progress', progress.toFixed(2))
})
</script>

<style lang="scss" scoped>
.custom-progress {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 60vh;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  overflow: hidden;
  z-index: 10;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--secondary-brand-color);
    transform-origin: bottom;
    transform: scaleY(calc(var(--progress, 0) / 100));
    transition: transform 0.4s ease;
  }
}

.custom-count {
  position: absolute;
  min-width: 310px;
  bottom: 20px;
  left: 40px;
  font-size: 100px;
  font-weight: 700;
  color: var(--white-color);
  pointer-events: none;
  opacity: 0.2;
  text-align: end;
}
</style>
