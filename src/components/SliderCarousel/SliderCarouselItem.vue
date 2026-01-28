<template>
  <div class="carousel__item">
    <h2>{{ slide.title }}</h2>

    <ul v-if="slide.bullets">
      <li v-for="item in slide.bullets" :key="item">{{ item }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  slide: any
}>()
</script>
