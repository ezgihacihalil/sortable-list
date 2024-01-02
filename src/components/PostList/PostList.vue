<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useStore } from '../../stores/actions';
import { POSTS_API_URL } from '../../constants';
import fetcher from '../../utils/fetcher';
import MoveButton from './MoveButton.vue';

import { Direction } from './types';

const store = useStore();
const toastMessage = ref('');

const showError = () => {
  toastMessage.value = 'Failed to fetch posts';

  setTimeout(() => {
    toastMessage.value = '';
  }, 3000);
};

const fetchPosts = async () => {
  try {
    const { data } = await fetcher.get(POSTS_API_URL);
    store.posts = data.slice(0, 5);
    store.postHistory.unshift(data.slice(0, 5));
  } catch (error) {
    showError();
  }
};

onMounted(fetchPosts);
</script>

<template>
  <transition
    enter-active-class="transition-opacity duration-500"
    leave-active-class="transition-opacity duration-500"
    enter-class="opacity-0"
    leave-to-class="opacity-0"
  >
    <div
      v-if="toastMessage"
      class="fixed bottom-0 left-0 right-0 p-4 bg-red-500 text-white text-center transition-transform duration-500"
    >
      {{ toastMessage }}
    </div>
  </transition>
  <transition-group tag="div">
    <div
      role="article"
      v-for="(post, index) in store.posts"
      :key="post.id"
      class="shadow-md bg-white rounded-md my-2 sm:my-4 h-20 px-4 flex items-center justify-between transition-transform duration-500"
    >
      <div class="text-neutral-700 font-sans sm:text-lg">Post {{ post.id }}</div>
      <div class="flex flex-col justify-center gap-6 h-4/6">
        <MoveButton :index="index" :direction="Direction.Up" v-if="index !== 0" />
        <MoveButton :index="index" :direction="Direction.Down" v-if="index !== 4" />
      </div>
    </div>
  </transition-group>
</template>
