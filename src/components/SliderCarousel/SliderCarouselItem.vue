<template>
  <div class="carousel__item item" :class="classList">
    <!-- TITLE -->
    <h2 class="item__title">{{ slide.title }}</h2>

    <!-- SUBTITLE -->
    <p class="item__subtitle" v-if="slide.subtitle">
      {{ slide.subtitle }}
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

    <!-- NOTE -->
    <p v-if="slide.note">
      {{ slide.note }}
    </p>

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
import { computed } from 'vue'
import type { Slide } from '@/types/slider'

const props = defineProps<{
  slide: Slide
}>()

const classList = computed(() => {
  return `item-${props.slide.type} item--${props.slide.id}`
})
</script>

<style lang="scss" scoped>
.item {
  height: 100%;
  width: 100%;
  color: var(--white-color);
  padding: 20px;
  display: grid;
  place-content: center;
  gap: 20px;
  text-align: center;

  &--title {
  }

  &__title,
  &__subtitle {
    font-size: 50px;
    font-weight: 700;
  }

  &__subtitle {
    font-size: 36px;
  }
}
</style>
