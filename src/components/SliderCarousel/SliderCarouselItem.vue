<template>
  <div class="slide-container" :class="classList">
    <!-- Title slide -->
    <template v-if="slide.type === 'title'">
      <div class="slide-title-page">
        <h1>{{ slide.title }}</h1>
        <h2 v-if="slide.subtitle">{{ slide.subtitle }}</h2>
      </div>
    </template>

    <!-- Content slide -->
    <template v-else-if="slide.type === 'content'">
      <div class="slide-content">
        <h2>{{ slide.title }}</h2>
        <ul v-if="slide.bullets" class="bullets">
          <li v-for="(bullet, index) in slide.bullets" :key="index">
            {{ bullet }}
          </li>
        </ul>
        <div v-if="slide.examples" class="examples">
          <p v-for="(example, index) in slide.examples" :key="index" class="example">
            {{ example }}
          </p>
        </div>
        <div v-if="slide.note" class="note">💡 {{ slide.note }}</div>
      </div>
    </template>

    <!-- Warning slide -->
    <template v-else-if="slide.type === 'warning'">
      <div class="slide-warning">
        <h2>⚠️ {{ slide.title }}</h2>
        <ul v-if="slide.bullets" class="bullets">
          <li v-for="(bullet, index) in slide.bullets" :key="index">
            {{ bullet }}
          </li>
        </ul>
        <div v-if="slide.result" class="result">
          <strong>⚡ Наслідок:</strong> {{ slide.result }}
        </div>
        <div v-if="slide.note" class="note">💡 {{ slide.note }}</div>
      </div>
    </template>

    <!-- Case study slide -->
    <template v-else-if="slide.type === 'case' && slide.case">
      <div class="slide-case">
        <h2>📖 {{ slide.title }}</h2>

        <div class="case-situation">
          <strong>Ситуація:</strong>
          <p>{{ slide.case.situation }}</p>
        </div>

        <div v-if="slide.case.reality" class="case-reality">
          <strong>Реальність:</strong>
          <ul>
            <li v-for="(item, index) in slide.case.reality" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>

        <div v-if="slide.case.consequences" class="case-consequences">
          <strong>Наслідки:</strong>
          <ul>
            <li v-for="(item, index) in slide.case.consequences" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>

        <div v-if="slide.case.problem" class="case-problem">
          <strong>Проблема:</strong>
          <p>{{ slide.case.problem }}</p>
        </div>

        <div v-if="slide.case.question" class="case-question">
          <strong>Питання:</strong>
          <p>{{ slide.case.question }}</p>
        </div>

        <div v-if="slide.case.badResponse" class="case-bad-response">
          <p>{{ slide.case.badResponse }}</p>
        </div>

        <div v-if="slide.case.goodResponse" class="case-good-response">
          <p>{{ slide.case.goodResponse }}</p>
        </div>

        <div v-if="slide.case.outcome" class="case-outcome">
          <strong>Результат:</strong>
          <ul>
            <li v-for="(item, index) in slide.case.outcome" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>

        <div v-if="slide.case.conclusion" class="case-conclusion">
          <strong>💡 Висновок:</strong>
          <p>{{ slide.case.conclusion }}</p>
        </div>

        <div v-if="slide.case.lesson" class="case-lesson">
          <strong>🎯 Урок:</strong>
          <p>{{ slide.case.lesson }}</p>
        </div>
      </div>
    </template>

    <!-- Example slide -->
    <template v-else-if="slide.type === 'example' && slide.example">
      <div class="slide-example">
        <h2>💡 {{ slide.title }}</h2>

        <div class="example-header">
          <h3>{{ slide.example.title }}</h3>
          <p class="example-description">{{ slide.example.description }}</p>
        </div>

        <div class="example-items">
          <template v-for="(item, index) in slide.example.items" :key="index">
            <hr v-if="item === '---'" class="divider" />
            <p v-else class="example-item">{{ item }}</p>
          </template>
        </div>

        <div class="example-conclusion">
          <strong>✨ Висновок:</strong>
          <p>{{ slide.example.conclusion }}</p>
        </div>
      </div>
    </template>

    <!-- Checklist slide -->
    <template v-else-if="slide.type === 'checklist'">
      <div class="slide-checklist">
        <h2>✅ {{ slide.title }}</h2>
        <ul class="checklist">
          <li v-for="(item, index) in slide.checklist" :key="index" class="checklist-item">
            <input type="checkbox" :id="`check-${slide.id}-${index}`" />
            <label :for="`check-${slide.id}-${index}`">{{ item }}</label>
          </li>
        </ul>
        <div v-if="slide.note" class="note">💡 {{ slide.note }}</div>
      </div>
    </template>

    <!-- Summary slide -->
    <template v-else-if="slide.type === 'summary'">
      <div class="slide-summary">
        <h2>🎯 {{ slide.title }}</h2>
        <ul v-if="slide.bullets" class="bullets summary-bullets">
          <li v-for="(bullet, index) in slide.bullets" :key="index">
            {{ bullet }}
          </li>
        </ul>
        <div v-if="slide.note" class="note highlight">💡 {{ slide.note }}</div>
      </div>
    </template>

    <!-- Resources slide -->
    <template v-else-if="slide.type === 'resources'">
      <div class="slide-resources">
        <h2>📚 {{ slide.title }}</h2>
        <ul class="resources">
          <li v-for="(resource, index) in slide.resources" :key="index">
            {{ resource }}
          </li>
        </ul>
      </div>
    </template>

    <!-- Final slide -->
    <template v-else-if="slide.type === 'final'">
      <div class="slide-final">
        <h1>{{ slide.title }}</h1>
        <h2 v-if="slide.subtitle">{{ slide.subtitle }}</h2>
        <div v-if="slide.note" class="note">
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
  return `slide-type-${props.slide.type} item--${props.slide.id}`
})
</script>

<style lang="scss" scoped>
.slide-container {
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
