<script setup lang="ts">
import { useStore } from '../stores/actions';

const store = useStore();

const timeTravel = (index: number) => {
  store.timeTravel(index);
};
</script>

<template>
  <div v-if="store.actions.length > 0" class="shadow-md bg-white rounded-md mt-5 md:-mt-8">
    <h1 class="text-neutral-700 text-xl font-sans font-semibold p-4">List of actions commited</h1>
    <div class="bg-gray-200 items-center p-2 md:p-4">
      <transition-group name="fade" tag="div">
        <div v-for="action in store.actions" :key="action.id">
          <div class="action shadow-md bg-white p-2 flex w-full items-center justify-between border-b">
            <p
              class="text-neutral-700 font-sans whitespace-nowrap overflow-hidden text-ellipsis text-sm"
            >
              {{ action.description }}
            </p>
            <button
              class="bg-green-400 text-neutral-700 font-sans font-semibold rounded-lg text-center px-2 py-1 whitespace-nowrap text-sm sm:px-4 sm:py-2 hover:bg-green-300"
              @click="timeTravel(action.id)"
            >
              Time travel
            </button>
          </div>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<style scoped>
.fade-move {
  transition: transform 0.5s;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
