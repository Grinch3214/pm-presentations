<template>
  <Carousel ref="carouselRef" v-bind="carouselConfig" @slide-start="handleSlideStart">
    <Slide v-for="slide in slideStore.slides" :key="slide.id">
      <SliderCarouselItem :slide="slide" />
    </Slide>

    <template #addons>
      <div class="custom-progress"></div>
      <div class="custom-count">{{ currentSlideIndex + 1 }} / {{ slideStore.totalSlides }}</div>

      <nav class="custom-nav">
        <SlideCarouselButton
          v-for="(slide, index) in slideStore.slides"
          :key="slide.id"
          :index="index"
          :is-active="index === currentSlideIndex"
          @click="goToSlide(index)"
          @mouseenter="hoveredIndex = index"
          @mouseleave="hoveredIndex = null"
        />

        <!-- TODO: Separate tooltip -->
        <div
          class="custom-nav__tooltip"
          :class="{ 'custom-nav__tooltip--visible': visibleIndex !== null }"
        >
          {{ tooltipTitle }}
        </div>
      </nav>
    </template>
  </Carousel>
</template>

<script setup lang="ts">
import 'vue3-carousel/carousel.css'
import { ref, onMounted, watch, computed } from 'vue'
import { Carousel, Slide, type CarouselExposed } from 'vue3-carousel'
import { useSlideStore } from '@/stores/slider'
import SliderCarouselItem from './SliderCarouselItem.vue'
import SlideCarouselButton from './SlideCarouselButton.vue'

interface CarouselData {
  currentSlideIndex: number
  prevSlideIndex: number
  slidesCount: number
  slidingToIndex: number
}

const slideStore = useSlideStore()

const STORAGE_KEY = 'carousel-current-slide' as string

const currentSlideIndex = ref<number>(loadSavedSlideIndex())
const carouselRef = ref<CarouselExposed | null>(null)
const hoveredIndex = ref<number | null>(null)
const visibleIndex = ref<number | null>(null)
let hideTimeout: ReturnType<typeof setTimeout> | null = null

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

function goToSlide(index: number): void {
  carouselRef.value?.slideTo(index)
}

const tooltipTitle = computed(() => {
  if (!visibleIndex.value) return ''
  return slideStore.slides[visibleIndex.value]?.title ?? ''
})

watch(hoveredIndex, (val) => {
  if (val !== null) {
    if (hideTimeout) clearTimeout(hideTimeout)
    visibleIndex.value = val
  } else {
    hideTimeout = setTimeout(() => {
      visibleIndex.value = null
    }, 100)
  }
})

onMounted(() => {
  const total = slideStore.totalSlides
  const progress = total <= 1 ? 0 : (currentSlideIndex.value / (total - 1)) * 100
  document.documentElement.style.setProperty('--progress', progress.toFixed(2))
})
</script>

<style lang="scss" scoped>
@use '/src/assets/scss/_vars.scss' as v;

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
  bottom: 10px;
  left: 20px;
  min-width: 160px;
  font-size: 50px;
  font-weight: 700;
  color: var(--white-color);
  pointer-events: none;
  opacity: 0.2;
  text-align: end;

  @include v.bp1200 {
    font-size: 100px;
    min-width: 310px;
    left: 40px;
    bottom: 20px;
  }
}

.custom-nav {
  --nav-opacity: 0;
  --nav-display: none;

  display: var(--nav-display);
  justify-content: center;
  gap: 8px;
  position: fixed;
  bottom: 30px;
  left: 10vw;
  right: 0;
  opacity: var(--nav-opacity);
  transition: opacity 0.2s linear;

  &:hover {
    --nav-opacity: 1;
  }

  @include v.bp1360 {
    --nav-display: flex;
  }

  &__tooltip {
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: var(--secondary-brand-color);
    color: var(--black-color);
    font-weight: 700;
    font-size: 20px;
    padding: 10px;
    border-radius: 8px;
    max-width: 1000px;
    text-align: center;
    opacity: 0;
    pointer-events: none;

    &::before {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 25px;
      height: 10px;
      background: var(--secondary-brand-color);
      clip-path: polygon(50% 100%, 0 0, 100% 0);
    }

    &--visible {
      opacity: 0.95;
      transition: 0.2s linear;
      transform: translateX(-50%) translateY(-10px);
    }
  }
}
</style>
