<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useStore } from '../stores/actions';
import { POSTS_API_URL } from '../constants';
import fetcher from '../utils/fetcher';
import upArrow from '../assets/up-arrow.svg';
import downArrow from '../assets/down-arrow.svg';

interface Post {
  id: number;
  title: string;
}

enum Direction {
  Up = 'up',
  Down = 'down',
}

const posts = ref<Post[]>([]);
const store = useStore();

watchEffect(async () => {
  try {
    const { data } = await fetcher.get(POSTS_API_URL);
    posts.value = data.slice(0, 5);
  } catch (error) {
    console.error('Failed to fetch posts:', error);
  }
});

const movePost = (index: number, direction: Direction) => {
  const newIndex = direction === Direction.Up ? index - 1 : index + 1;

  if (newIndex >= 0 && newIndex < posts.value.length) {
    const temp = posts.value[index];

    posts.value[index] = posts.value[newIndex];
    posts.value[newIndex] = temp;

    store.add(`Moved post ${temp.id} from index ${index} to index ${newIndex}`);
  }
};
</script>

<template>
  <div>
    <div 
      v-for="(post, index) in posts" 
      :key="post.id"
      class="shadow-md bg-white rounded-md my-2 sm:my-4 h-20 px-4 flex items-center justify-between"
    >
      <div class="text-neutral-700 font-sans sm:text-lg">Post {{ post.id }}</div>
      <div class="flex flex-col justify-center gap-6 h-4/6">
        <button v-if="index !== 0" class="size-4" @click="movePost(index, Direction.Up)">
          <img class="fill-purple-700" :src="upArrow" />
        </button>
        <button v-if="index !== 4" class="size-4" @click="movePost(index, Direction.Up)">
          <img class="fill-purple-700" :src="downArrow" />
        </button>
      </div>
    </div>
  </div>
</template>
