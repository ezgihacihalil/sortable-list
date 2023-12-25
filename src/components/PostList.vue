<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useStore } from '../stores/actions'

const posts = ref([]);
const store = useStore();

watchEffect(async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts')
  const data = await response.json()
  posts.value = data.slice(0, 5)
})

const moveUp = (index: number) => {
  if (index > 0) {
    const temp = posts.value[index]
    posts.value[index] = posts.value[index - 1]
    posts.value[index - 1] = temp
    store.add(`Moved Post ${temp.id} from index ${index} to index ${index - 1}`) // use the store's add method
  }
}

const moveDown = (index: number) => {
  if (index < posts.value.length - 1) {
    const temp = posts.value[index]
    posts.value[index] = posts.value[index + 1]
    posts.value[index + 1] = temp
    store.add(`Moved Post ${temp.id} from index ${index} to index ${index + 1}`) // use the store's add method
  }
}
</script>

<template>
  <div>
    <div v-for="(post, index) in posts" :key="post.id">
      <div>Post {{ post.id }}</div>
      <button @click="moveUp(index)">Up</button>
      <button @click="moveDown(index)">Down</button>
    </div>
  </div>
</template>