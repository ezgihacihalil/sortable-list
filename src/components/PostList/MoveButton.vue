<script setup lang="ts">
import { useStore } from '@/stores/actions';
import { Direction } from './types';
import upArrow from '../../assets/up-arrow.svg';
import downArrow from '../../assets/down-arrow.svg';

const props = defineProps<{
  index: number;
  direction: Direction;
}>();

const { movePost } = useStore();

const arrowSrc = props.direction === Direction.Up ? upArrow : downArrow;

const handleMove = () => {
  movePost(props.index, props.direction);
};

defineExpose({
  handleMove,
});
</script>

<template>
  <button class="size-4" @click="handleMove" :aria-label="`Move ${direction}`">
    <img :src="arrowSrc" class="fill-purple-700" />
  </button>
</template>
