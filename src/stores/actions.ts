import { type Post, Direction } from '@/components/PostList/types';
import { defineStore } from 'pinia';

interface Action {
  id: number;
  description: string;
}

export const useStore = defineStore({
  id: 'actions',
  state: () => ({
    actions: [] as Action[],
    posts: [] as Post[],
    postHistory: [] as Post[][],
  }),
  actions: {
    add(id: number, description: string) {
      this.actions.unshift({ id, description });
      this.postHistory.unshift([...this.posts]);
    },
    updatePostHistory() {
      if (this.postHistory[0].length === 0) {
        this.postHistory[0] = [...this.posts];
      } else {
        this.postHistory.unshift([...this.posts]);
      }
    },
    movePost(index: number, direction: Direction) {
      const newIndex = direction === Direction.Up ? index - 1 : index + 1;

      if (newIndex >= 0 && newIndex < this.posts.length) {
        const temp = this.posts[index];
        this.posts[index] = this.posts[newIndex];
        this.posts[newIndex] = temp;

        const actionId = Date.now();
        const description = `Moved post ${temp.id} from index ${index} to index ${newIndex}`;
        this.add(actionId, description);
      }
    },
    timeTravel(id: number) {
      const index = this.actions.findIndex((action) => action.id === id);

      if (index !== -1) {
        this.actions = this.actions.slice(index + 1);

        this.posts = [...this.postHistory[index + 1]];
        this.postHistory = this.postHistory.slice(index + 1);
      }
    },
  },
});
