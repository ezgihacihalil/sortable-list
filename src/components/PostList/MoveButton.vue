<script setup lang="ts">
import { useStore } from '@/stores/actions';
import { Direction } from './types';
import Arrow from './Arrow.vue';


const props = defineProps<{
  index: number;
  direction: Direction;
}>();

const { movePost } = useStore();

const handleMove = () => {
  movePost(props.index, props.direction);
};

defineExpose({
  handleMove,
});
</script>

<template>
  <button @click="handleMove" :aria-label="`Move ${direction}`">
    <Arrow color="fill-temper-purple" :direction="direction" />
  </button>
</template>
