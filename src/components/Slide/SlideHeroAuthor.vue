<template>
  <div class="author">
    <div class="author__photo">
      <img v-if="author.photo" :src="author.photo" :alt="author.name" />
    </div>
    <div class="author__info">
      <p class="author__name">{{ author.name }}</p>
      <p class="author__role">{{ author.role }}</p>
      <p class="author__exp">{{ author.experience }}</p>
      <ul class="author__soc">
        <li v-for="item in socialsWithDecor" :key="item.id" class="author__soc-item">
          <template v-if="!item.isDecor">
            <a :href="item.link" class="author__soc-link" target="_blank">
              {{ item.name }}
            </a>
          </template>
          <template v-else>
            <span class="author__soc-decor"></span>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Author } from '@/types/slider'
import type { SocialType } from '@/types/hero'

defineProps<{
  author: Author
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

const socialsWithDecor = computed(() =>
  socials.flatMap((item, index) => {
    const result: SocialType[] = [item]

    if (index < socials.length - 1) {
      result.push({ id: `decor-${item.id}`, isDecor: true })
    }

    return result
  }),
)
</script>

<style scoped lang="scss">
@use '../../assets/scss/_vars.scss' as v;

.author {
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

  &__photo {
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

  &__info {
    display: grid;
    gap: 5px;
  }

  &__name {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 4px;
    text-shadow: 0px 0px 4px var(--brand-color);
  }

  &__soc {
    display: flex;
    justify-content: center;
    gap: 10px;
  }

  &__soc-item {
    display: flex;
    align-items: center;
  }

  &__soc-decor {
    width: 6px;
    height: 6px;
    display: block;
    background: var(--cyan-color);
    border-radius: 50%;
  }

  &__soc-link {
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