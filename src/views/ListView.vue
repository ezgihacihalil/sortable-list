<script lang="ts">
import { defineComponent } from "vue";
import PostList from "../components/PostList.vue";
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
  <PostList />
  <ActionList />
</template>
