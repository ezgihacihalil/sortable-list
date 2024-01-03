<script setup lang="ts">
import { Direction } from '@/components/PostList/types';
import { computed } from 'vue';

const props = defineProps<{
  color: string;
  direction: Direction;
}>();

const rotationClass = computed(() => {
  return props.direction === Direction.Up ? 'rotate-180' : '';
});
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    :class="[color, rotationClass]"
    class="size-4"
  >
    <polygon
      points="12 17.414 3.293 8.707 4.707 7.293 12 14.586 19.293 7.293 20.707 8.707 12 17.414"
    />
  </svg>
</template>
