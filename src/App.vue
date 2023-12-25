<script lang="ts">
import { defineComponent } from 'vue'
import PostList from './components/PostList.vue'
import ActionsList from './components/ActionsList.vue'

export default defineComponent({
  name: 'App',
  components: {
    PostList,
    ActionsList
  },
})
</script>

<template>
  <div id="app">
    <PostList />
    <ActionsList />
  </div>
</template>
