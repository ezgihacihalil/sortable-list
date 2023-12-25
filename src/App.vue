<script lang="ts">
import { defineComponent } from 'vue';
import ListView from './views/ListView.vue';

export default defineComponent({
  name: 'App',
  components: {
    ListView,
  },
})
</script>

<template>
    <ListView />
</template>