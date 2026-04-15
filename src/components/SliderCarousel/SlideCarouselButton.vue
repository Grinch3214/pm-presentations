<template>
  <button
    class="slide-btn"
    :class="{ 'slide-btn--active': isActive }"
    @click="$emit('click')"
    @mouseenter="$emit('mouseenter', index)"
    @mouseleave="$emit('mouseleave')"
  >
    {{ index + 1 }}
  </button>
</template>

<script setup lang="ts">
defineProps<{
  index: number
  isActive: boolean
}>()

defineEmits<{
  click: []
  mouseenter: [index: number]
  mouseleave: []
}>()
</script>

<style scoped lang="scss">
@use '../../assets/scss/_vars.scss' as v;

.slide-btn {
  --btn-text-color: var(--white-color);
  --btn-bg-color: var(--brand-color);
  --btn-shadow-color: var(--cyan-color);

  background: var(--btn-bg-color);
  color: var(--btn-text-color);
  width: 24px;
  height: 24px;
  border-radius: 50%;
  font-size: 14px;
  font-weight: 700;
  box-shadow: inset 0 0 3px 1px var(--btn-shadow-color);

  &:active:not(.slide-btn--active) {
    --btn-bg-color: rgb(20, 59, 133);
  }

  &--active {
    --btn-bg-color: var(--secondary-brand-color);
    --btn-text-color: var(--black-color);
    --btn-shadow-color: rgb(133, 255, 51);

    pointer-events: none;
  }
}
</style>
