<template>
  <div class="slide__case">
    <h2 class="slide__case-subtitle subtitle">📖 {{ slide.title }}</h2>

    <div class="slide__case-situation">
      <strong class="slide__case-strong">Ситуація:</strong>
      <p class="slide__case-desc">{{ slide.case!.situation }}</p>
    </div>

    <div v-if="slide.case!.reality" class="slide__case-reality">
      <strong class="slide__case-strong">Реальність:</strong>
      <ul class="slide__case-list">
        <li v-for="(item, index) in slide.case!.reality" :key="index" class="slide__case-item">
          {{ item }}
        </li>
      </ul>
    </div>

    <div v-if="slide.case!.consequences" class="slide__case-consequences">
      <strong class="slide__case-strong">Наслідки:</strong>
      <ul class="slide__case-list">
        <li
          v-for="(item, index) in slide.case!.consequences"
          :key="index"
          class="slide__case-item"
        >
          {{ item }}
        </li>
      </ul>
    </div>

    <div v-if="slide.case!.problem" class="slide__case-problem">
      <strong class="slide__case-strong">Проблема:</strong>
      <p class="slide__case-desc">{{ slide.case!.problem }}</p>
    </div>

    <div v-if="slide.case!.question" class="slide__case-question">
      <strong class="slide__case-strong">Питання:</strong>
      <p class="slide__case-desc">{{ slide.case!.question }}</p>
    </div>

    <div v-if="slide.case!.badResponse" class="slide__case-bad-response">
      <p class="slide__case-desc">{{ slide.case!.badResponse }}</p>
    </div>

    <div v-if="slide.case!.goodResponse" class="slide__case-good-response">
      <p class="slide__case-desc">{{ slide.case!.goodResponse }}</p>
    </div>

    <div v-if="slide.case!.outcome" class="slide__case-outcome">
      <strong class="slide__case-strong">Результат:</strong>
      <ul class="slide__case-list">
        <li v-for="(item, index) in slide.case!.outcome" :key="index" class="slide__case-item">
          {{ item }}
        </li>
      </ul>
    </div>

    <div v-if="slide.case!.conclusion" class="slide__case-conclusion">
      <strong class="slide__case-strong">💡 Висновок:</strong>
      <p class="slide__case-desc">{{ slide.case!.conclusion }}</p>
    </div>

    <div v-if="slide.case!.lesson" class="slide__case-lesson">
      <strong class="slide__case-strong">🎯 Висновок:</strong>
      <p class="slide__case-desc">{{ slide.case!.lesson }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Slide } from '@/types/slider'

defineProps<{
  slide: Slide
}>()
</script>