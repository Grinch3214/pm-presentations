<template>
  <div class="carousel__item">{{ slide }}</div>
</template>

<script setup lang="ts">
const props = defineProps<{
  slide: any
}>()
</script>
