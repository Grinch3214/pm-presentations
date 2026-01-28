<template>
  <div class="carousel__item item" :class="`item--${slide.type}`">
    <!-- TITLE -->
    <h2>{{ slide.title }}</h2>

    <!-- SUBTITLE -->
    <p v-if="slide.subtitle">
      {{ slide.subtitle }}
    </p>

    <!-- NOTE -->
    <p v-if="slide.note">
      {{ slide.note }}
    </p>

    <!-- RESULT -->
    <p v-if="slide.result">
      {{ slide.result }}
    </p>

    <!-- BULLETS -->
    <ul v-if="slide.bullets">
      <li v-for="(item, index) in slide.bullets" :key="index">
        {{ item }}
      </li>
    </ul>

    <!-- CHECKLIST -->
    <ul v-if="slide.checklist">
      <li v-for="(item, index) in slide.checklist" :key="index">
        <input type="checkbox" disabled />
        {{ item }}
      </li>
    </ul>

    <!-- CASE BLOCK -->
    <div v-if="slide.case">
      <!-- Situation -->
      <div v-if="slide.case.situation">
        <strong>Ситуація:</strong>
        <p>{{ slide.case.situation }}</p>
      </div>

      <!-- Reality -->
      <div v-if="slide.case.reality">
        <strong>Реальність:</strong>
        <ul>
          <li v-for="(item, index) in slide.case.reality" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>

      <!-- Consequences -->
      <div v-if="slide.case.consequences">
        <strong>Наслідки:</strong>
        <ul>
          <li v-for="(item, index) in slide.case.consequences" :key="index">
            {{ item }}
          </li>
        </ul>
      </div>

      <!-- Conclusion -->
      <div v-if="slide.case.conclusion">
        <strong>Висновок:</strong>
        <p>{{ slide.case.conclusion }}</p>
      </div>

      <!-- Lesson -->
      <div v-if="slide.case.lesson">
        <strong>Урок:</strong>
        <p>{{ slide.case.lesson }}</p>
      </div>

      <!-- Problem -->
      <div v-if="slide.case.problem">
        <strong>Проблема:</strong>
        <p>{{ slide.case.problem }}</p>
      </div>

      <!-- Question -->
      <div v-if="slide.case.question">
        <strong>Питання:</strong>
        <p>{{ slide.case.question }}</p>
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

<style lang="scss" scoped>
.item {
  height: 100%;
  width: 100%;
  color: var(--white-color);
  padding: 20px;
}
</style>
