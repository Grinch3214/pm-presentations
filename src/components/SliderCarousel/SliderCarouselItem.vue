<template>
  <div class="slide" :class="classList">
    <component :is="slideComponent" :slide="slide" />
  </div>
</template>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import type { Slide, SlideType } from '@/types/slider'
import SlideHero from '@/components/Slide/SlideHero.vue'
import SlideContent from '@/components/Slide/SlideContent.vue'
import SlideWarning from '@/components/Slide/SlideWarning.vue'
import SlideCase from '@/components/Slide/SlideCase.vue'
import SlideExample from '@/components/Slide/SlideExample.vue'
import SlideChecklist from '@/components/Slide/SlideChecklist.vue'
import SlideSummary from '@/components/Slide/SlideSummary.vue'
import SlideResources from '@/components/Slide/SlideResources.vue'
import SlideFinal from '@/components/Slide/SlideFinal.vue'

const props = defineProps<{
  slide: Slide
}>()

const slideComponents: Record<SlideType, Component> = {
  title: SlideHero,
  content: SlideContent,
  warning: SlideWarning,
  case: SlideCase,
  example: SlideExample,
  checklist: SlideChecklist,
  summary: SlideSummary,
  resources: SlideResources,
  final: SlideFinal,
}

const slideComponent = computed(() => slideComponents[props.slide.type])
const classList = computed(() => `slide-type-${props.slide.type} slide--${props.slide.id}`)
</script>