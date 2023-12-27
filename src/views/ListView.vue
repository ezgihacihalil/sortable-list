<script lang="ts">
import { defineComponent } from "vue";
import PostList from "../components/PostList/PostList.vue";
import ActionList from "../components/ActionList.vue";

export default defineComponent({
  name: "PostActionList",
  components: {
    PostList,
    ActionList,
  },
});
</script>

<template>
  <div class="bg-gray-100 relative px-2 py-6 h-screen min-h-screen w-screen sm:p-6 lg:p-9 overflow-x-hidden">
    <div class="bg-purple-700 h-72 w-[150%] md:w-[180%] absolute -left-20 md:-left-24 -top-60 md:-top-64 -rotate-12" />
    <div class="relative z-10">
      <h1 class="text-neutral-100 font-semibold font-sans text-2xl mt-2 sm:mt-6">
        Sortable Post List
      </h1>
      <div class="md:grid grid-cols-2 gap-4 items-start">
        <PostList />
        <ActionList />
      </div>
    </div>
  </div>
</template>
