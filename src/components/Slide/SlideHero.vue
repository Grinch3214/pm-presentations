<template>
  <div class="hero">
    <div class="hero__content">
      <h1 class="hero__content-title">{{ slide.title }}</h1>
      <h2 class="hero__content-subtitle subtitle" v-if="slide.subtitle">
        {{ slide.subtitle }}
      </h2>
    </div>
    <!-- TODO: Need to refactor author section (use as component) -->
    <div class="hero__author" v-if="slide.author">
      <div class="hero__author-photo">
        <img v-if="slide.author.photo" :src="slide.author.photo" :alt="slide.author.name" />
      </div>
      <div class="hero__author-info">
        <p class="hero__author-name">{{ slide.author.name }}</p>
        <p class="hero__author-role">{{ slide.author.role }}</p>
        <p class="hero__author-exp">{{ slide.author.experience }}</p>
        <ul class="hero__author-soc">
          <li v-for="item in socialsWithDecor" :key="item.id" class="hero__author-soc-item">
            <template v-if="!item.isDecor">
              <a :href="item.link" class="hero__author-soc-link" target="_blank">
                {{ item.name }}
              </a>
            </template>

            <template v-else>
              <span class="hero__author-soc-decor"></span>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Slide } from '@/types/slider'
import type { SocialType } from '@/types/hero'

const props = defineProps<{
  slide: Slide
}>()

const socials: SocialType[] = [
  {
    id: 1,
    link: 'https://github.com/Grinch3214',
    name: 'GitHub',
  },
  {
    id: 2,
    link: 'https://www.linkedin.com/in/maxim-hrichina-6000a91ab',
    name: 'Linkedin',
  },
]

const socialsWithDecor = computed(() => {
  return socials.flatMap((item, index) => {
    const result = [item]

    if (index < socials.length - 1) {
      result.push({
        id: `decor-${item.id}`,
        isDecor: true,
      })
    }

    return result
  })
})
</script>

<style scoped lang="scss">
@use '../../assets/scss/_vars.scss' as v;

.hero {
  &__content {
    display: grid;
    align-content: end;
    gap: 20px;
    padding-top: 8vh;

    @include v.bp1200 {
      align-content: start;
      padding-top: 20vh;
    }
  }

  &__content-title {
    font-size: 30px;
    font-weight: 700;
    text-shadow: 0px 1px 8px var(--brand-color);

    @include v.bp992 {
      font-size: 40px;
    }

    @include v.bp1200 {
      font-size: 60px;
    }
  }

  &__content-subtitle {
    text-shadow: 0px 1px 8px var(--brand-color);
    letter-spacing: 1.2px;
  }

  &__author {
    padding-bottom: 10vh;
    display: flex;
    flex-flow: column;
    justify-content: flex-end;

    @include v.bp1200 {
      position: absolute;
      bottom: 10vh;
      right: 7vw;
      padding-bottom: 0;
    }
  }

  &__author-photo {
    width: 90px;
    height: 90px;
    margin: 0 auto 20px;
    overflow: hidden;
    border-radius: 50%;
    border: 4px solid var(--brand-color);
    box-shadow: 0px 0px 4px var(--white-color);

    @include v.bp1200 {
      width: 200px;
      height: 200px;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      filter: grayscale(50%);
    }
  }

  &__author-info {
    display: grid;
    gap: 5px;
  }

  &__author-name {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 4px;
    text-shadow: 0px 0px 4px var(--brand-color);
  }

  &__author-role {
  }

  &__author-exp {
  }

  &__author-soc {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  &__author-soc-item {
    display: flex;
    align-items: center;
  }

  &__author-soc-decor {
    width: 6px;
    height: 6px;
    display: block;
    background: var(--cyan-color);
    border-radius: 50%;
  }

  &__author-soc-link {
    color: var(--cyan-color);
    transition: all 0.2s linear;
    text-decoration: none;
    font-weight: 700;

    &:hover {
      opacity: 0.85;
    }

    &:active {
      --cyan-color: var(--brand-color);
    }
  }
}
</style>
