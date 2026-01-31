<template>
  <div class="slide" :class="classList">
    <!-- Title slide -->
    <template v-if="slide.type === 'title'">
      <div class="slide__page">
        <h1 class="slide__page-title">{{ slide.title }}</h1>
        <h2 class="slide__page-subtitle subtitle" v-if="slide.subtitle">{{ slide.subtitle }}</h2>
      </div>
    </template>

    <!-- Content slide -->
    <template v-else-if="slide.type === 'content'">
      <div class="slide__content">
        <h2 class="slide__content-subtitle subtitle">{{ slide.title }}</h2>
        <ul v-if="slide.bullets" class="slide__content-bullets bullets">
          <li class="bullets__item" v-for="(bullet, index) in slide.bullets" :key="index">
            {{ bullet }}
          </li>
        </ul>
        <div v-if="slide.examples" class="slide__content-examples examples">
          <p v-for="(example, index) in slide.examples" :key="index" class="examples__item">
            {{ example }}
          </p>
        </div>
        <div v-if="slide.note" class="slide__content-note note">💡 {{ slide.note }}</div>
      </div>
    </template>

    <!-- Warning slide -->
    <template v-else-if="slide.type === 'warning'">
      <div class="slide__warning">
        <h2 class="slide__warning-subtitle subtitle">⚠️ {{ slide.title }}</h2>
        <ul v-if="slide.bullets" class="slide__warning-bullets bullets">
          <li class="bullets__item" v-for="(bullet, index) in slide.bullets" :key="index">
            {{ bullet }}
          </li>
        </ul>
        <div v-if="slide.result" class="slide__warning-result result">
          <strong class="result__strong">⚡ Наслідок:</strong> {{ slide.result }}
        </div>
        <div v-if="slide.note" class="slide__warning-note note">💡 {{ slide.note }}</div>
      </div>
    </template>

    <!-- Case study slide -->
    <template v-else-if="slide.type === 'case' && slide.case">
      <div class="slide__case">
        <h2 class="slide__case-subtitle subtitle">📖 {{ slide.title }}</h2>

        <div class="slide__case-situation">
          <strong class="slide__case-strong">Ситуація:</strong>
          <p class="slide__case-desc">{{ slide.case.situation }}</p>
        </div>

        <div v-if="slide.case.reality" class="slide__case-reality">
          <strong class="slide__case-strong">Реальність:</strong>
          <ul class="slide__case-list">
            <li class="slide__case-item" v-for="(item, index) in slide.case.reality" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>

        <div v-if="slide.case.consequences" class="slide__case-consequences">
          <strong class="slide__case-strong">Наслідки:</strong>
          <ul class="slide__case-list">
            <li
              class="slide__case-item"
              v-for="(item, index) in slide.case.consequences"
              :key="index"
            >
              {{ item }}
            </li>
          </ul>
        </div>

        <div v-if="slide.case.problem" class="slide__case-problem">
          <strong class="slide__case-strong">Проблема:</strong>
          <p class="slide__case-desc">{{ slide.case.problem }}</p>
        </div>

        <div v-if="slide.case.question" class="slide__case-question">
          <strong class="slide__case-strong">Питання:</strong>
          <p class="slide__case-desc">{{ slide.case.question }}</p>
        </div>

        <div v-if="slide.case.badResponse" class="slide__case-bad-response">
          <p class="slide__case-desc">{{ slide.case.badResponse }}</p>
        </div>

        <div v-if="slide.case.goodResponse" class="slide__case-good-response">
          <p class="slide__case-desc">{{ slide.case.goodResponse }}</p>
        </div>

        <div v-if="slide.case.outcome" class="slide__case-outcome">
          <strong class="slide__case-strong">Результат:</strong>
          <ul class="slide__case-list">
            <li class="slide__case-item" v-for="(item, index) in slide.case.outcome" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>

        <div v-if="slide.case.conclusion" class="slide__case-conclusion">
          <strong class="slide__case-strong">💡 Висновок:</strong>
          <p class="slide__case-desc">{{ slide.case.conclusion }}</p>
        </div>

        <div v-if="slide.case.lesson" class="slide__case-lesson">
          <strong class="slide__case-strong">🎯 Урок:</strong>
          <p class="slide__case-desc">{{ slide.case.lesson }}</p>
        </div>
      </div>
    </template>

    <!-- Example slide -->
    <template v-else-if="slide.type === 'example' && slide.example">
      <div class="slide__example">
        <h2 class="slide__example-subtitle subtitle">💡 {{ slide.title }}</h2>

        <div class="slide__example-header">
          <h3 class="slide__example-title">{{ slide.example.title }}</h3>
          <p class="slide__example-description">{{ slide.example.description }}</p>
        </div>

        <div class="slide__example-items">
          <template v-for="(item, index) in slide.example.items" :key="index">
            <hr v-if="item === '---'" class="divider" />
            <p v-else class="slide__example-item">{{ item }}</p>
          </template>
        </div>

        <div class="slide__example-conclusion">
          <strong class="slide__example-strong">✨ Висновок:</strong>
          <p class="slide__example-desc">{{ slide.example.conclusion }}</p>
        </div>
      </div>
    </template>

    <!-- Checklist slide -->
    <template v-else-if="slide.type === 'checklist'">
      <div class="slide__checklist">
        <h2 class="slide__checklist-subtitle subtitle">✅ {{ slide.title }}</h2>
        <ul class="slide__checklist-list">
          <li v-for="(item, index) in slide.checklist" :key="index" class="slide__checklist-item">
            <input type="checkbox" :id="`check-${slide.id}-${index}`" />
            <label :for="`check-${slide.id}-${index}`">{{ item }}</label>
          </li>
        </ul>
        <div v-if="slide.note" class="slide__checklist-note note">💡 {{ slide.note }}</div>
      </div>
    </template>

    <!-- Summary slide -->
    <template v-else-if="slide.type === 'summary'">
      <div class="slide__summary">
        <h2 class="slide__summary-subtitle subtitle">🎯 {{ slide.title }}</h2>
        <ul v-if="slide.bullets" class="bullets slide__summary-bullets">
          <li class="bullets__item" v-for="(bullet, index) in slide.bullets" :key="index">
            {{ bullet }}
          </li>
        </ul>
        <div v-if="slide.note" class="note slide__summary-note">💡 {{ slide.note }}</div>
      </div>
    </template>

    <!-- Resources slide -->
    <template v-else-if="slide.type === 'resources'">
      <div class="slide__resources">
        <h2 class="slide__resources-subtitle subtitle">📚 {{ slide.title }}</h2>
        <ul class="slide__resources-list">
          <li
            class="slide__resources-item"
            v-for="(resource, index) in slide.resources"
            :key="index"
          >
            {{ resource }}
          </li>
        </ul>
      </div>
    </template>

    <!-- Final slide -->
    <template v-else-if="slide.type === 'final'">
      <div class="slide__final">
        <h1 class="slide__final-title">{{ slide.title }}</h1>
        <h2 class="slide__final-subtitle subtitle" v-if="slide.subtitle">{{ slide.subtitle }}</h2>
        <div v-if="slide.note" class="slide__final-note note">
          {{ slide.note }}
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Slide } from '@/types/slider'

const props = defineProps<{
  slide: Slide
}>()

const classList = computed(() => {
  return `slide-type-${props.slide.type} slide--${props.slide.id}`
})
</script>

<style lang="scss" scoped>
.subtitle {
  font-size: 40px;
  font-weight: 700;
}
.bullets {
  &__item {
  }
}
.examples {
  &__item {
  }
}
.note {
}

.result {
  &__strong {
  }
}
.divider {
}

.slide {
  height: 100%;
  width: 100%;
  color: var(--white-color);
  padding: 20px 40px;
  display: grid;
  place-content: center;
  gap: 20px;
  text-align: center;

  &__page {
    display: grid;
    gap: 20px;
  }

  &__page-title {
    font-size: 60px;
    font-weight: 700;
  }

  &__page-subtitle {
  }

  &__content {
  }

  &__content-subtitle {
  }

  &__content-bullets {
  }

  &__content-examples {
  }

  &__content-note {
  }

  &__warning {
  }

  &__warning-subtitle {
  }

  &__warning-bullets {
  }

  &__warning-result {
  }

  &__warning-note {
  }

  &__case {
  }

  &__case-subtitle {
  }

  &__case-situation {
  }

  &__case-strong {
  }

  &__case-desc {
  }

  &__case-reality {
  }

  &__case-list {
  }

  &__case-item {
  }

  &__case-consequences {
  }

  &__case-problem {
  }

  &__case-question {
  }

  &__case-bad-response {
  }

  &__case-good-response {
  }

  &__case-outcome {
  }

  &__case-conclusion {
  }

  &__case-lesson {
  }

  &__example {
  }

  &__example-subtitle {
  }

  &__example-header {
  }

  &__example-title {
  }

  &__example-description {
  }

  &__example-items {
  }

  &__example-item {
  }

  &__example-conclusion {
  }

  &__example-strong {
  }

  &__example-desc {
  }

  &__checklist {
  }

  &__checklist-subtitle {
  }

  &__checklist-list {
  }

  &__checklist-item {
  }

  &__checklist-note {
  }

  &__summary {
  }

  &__summary-subtitle {
  }

  &__summary-bullets {
  }

  &__summary-note {
  }

  &__resources {
  }

  &__resources-subtitle {
  }

  &__resources-list {
  }

  &__resources-item {
  }

  &__final {
  }

  &__final-title {
  }

  &__final-subtitle {
  }

  &__final-note {
  }
}
</style>
