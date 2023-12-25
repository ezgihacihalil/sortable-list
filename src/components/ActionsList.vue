<!-- ActionsList.vue -->
<script setup lang="ts">
import { useStore } from '../stores/actions';

const store = useStore()

const timeTravel = (index: number) => {
  store.timeTravel(index)
}
</script>

<template>
  <div>
    <div v-for="(action, index) in store.actions" :key="index">
      <div>{{ action }}</div>
      <button @click="timeTravel(index)">Time Travel</button>
    </div>
  </div>
</template>
