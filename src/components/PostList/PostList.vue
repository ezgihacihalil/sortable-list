<script setup lang="ts">
import { watchEffect } from 'vue';
import { useStore } from '../../stores/actions';
import { POSTS_API_URL } from '../../constants';
import fetcher from '../../utils/fetcher';
import upArrow from '../../assets/up-arrow.svg';
import downArrow from '../../assets/down-arrow.svg';
import { Direction } from './types';

const store = useStore();

watchEffect(async () => {
  try {
    const { data } = await fetcher.get(POSTS_API_URL);
    store.posts = data.slice(0, 5);
    store.postHistory.unshift(data.slice(0, 5));
  } catch (error) {
    console.error('Failed to fetch posts:', error);
  }
});
</script>

<template>
  <transition-group name="list" tag="div">
    <div
      v-for="(post, index) in store.posts"
      :key="post.id"
      class="post shadow-md bg-white rounded-md my-2 sm:my-4 h-20 px-4 flex items-center justify-between"
    >
      <div class="text-neutral-700 font-sans sm:text-lg">Post {{ post.id }}</div>
      <div class="flex flex-col justify-center gap-6 h-4/6">
        <button v-if="index !== 0" class="size-4" @click="store.movePost(index, Direction.Up)">
          <img class="fill-purple-700" :src="upArrow" />
        </button>
        <button v-if="index !== 4" class="size-4" @click="store.movePost(index, Direction.Down)">
          <img class="fill-purple-700" :src="downArrow" />
        </button>
      </div>
    </div>
  </transition-group>
</template>

<style scoped>
.list-move {
  transition: transform 0.5s;
}
.list-enter-active {
  animation: moveDown 0.5s;
}
.list-leave-active {
  animation: moveUp 0.5s;
}
@keyframes moveDown {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}
@keyframes moveUp {
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
