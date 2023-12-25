<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useStore } from '../stores/actions';
import { POSTS_API_URL } from '../constants';
import fetcher from '../utils/fetcher';

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

    store.add(`Moved Post ${temp.id} from index ${index} to index ${newIndex}`);
  }
};
</script>

<template>
  <div>
    <div v-for="(post, index) in posts" :key="post.id">
      <div>Post {{ post.id }}</div>
      <button @click="movePost(index, Direction.Up)">Up</button>
      <button @click="movePost(index, Direction.Up)">Down</button>
    </div>
  </div>
</template>
