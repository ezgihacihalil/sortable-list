<script setup lang="ts">
import { ref } from 'vue';
import PostList from '../components/PostList/PostList.vue';
import ActionList from '../components/ActionList.vue';

const toastMessage = ref('');

const showError = () => {
  toastMessage.value = 'Failed to fetch posts';

  setTimeout(() => {
    toastMessage.value = '';
  }, 3000);
};
</script>

<template>
  <div
    class="bg-gray-100 relative px-2 py-6 h-screen min-h-screen w-screen sm:p-6 lg:p-9 overflow-x-hidden"
  >
    <div
      class="bg-temper-purple absolute -top-[445px] sm:-top-[445px] -left-[195px] sm:-left-[100px] h-[55%] sm:h-2/4 -rotate-[25deg] sm:-rotate-12 w-[200%]"
    />
    <div class="relative z-10">
      <h1 class="text-neutral-100 font-semibold font-sans text-2xl mt-2 sm:mt-6">
        Sortable Post List
      </h1>
      <div class="md:grid grid-cols-2 gap-4 items-start">
        <PostList @error="showError" />
        <ActionList />
      </div>
    </div>
    <transition
      enter-active-class="transition-opacity duration-500"
      leave-active-class="transition-opacity duration-500"
      enter-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="toastMessage"
        class="toast fixed bottom-0 left-0 right-0 p-4 bg-red-500 text-white text-center transition-transform duration-500"
      >
        {{ toastMessage }}
      </div>
    </transition>
  </div>
</template>
