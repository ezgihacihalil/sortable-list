<script setup lang="ts">
import { useStore } from '@/stores/actions';
import { Direction } from './types';
import upArrow from '../../assets/up-arrow.svg';
import downArrow from '../../assets/down-arrow.svg';

const props = defineProps(['index', 'direction']);

const store = useStore();

const arrowSrc = props.direction === Direction.Up ? upArrow : downArrow;

const handleMove = () => {
  store.movePost(props.index, props.direction);
};

const shouldShowMoveButton = (index: number, direction: Direction) => {
  return direction === Direction.Up ? index !== 0 : index !== 4;
};

defineExpose({ handleMove, shouldShowMoveButton });
</script>

<template>
  <button
    class="size-4"
    @click="handleMove"
    v-if="shouldShowMoveButton(props.index, props.direction)"
  >
    <img :src="arrowSrc" class="fill-purple-700" />
  </button>
</template>
