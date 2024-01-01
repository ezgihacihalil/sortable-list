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
    movePost(index: number, direction: Direction) {
      const newIndex = direction === Direction.Up ? index - 1 : index + 1;

      if (newIndex >= 0 && newIndex < this.posts.length) {
        const [movedPost] = this.posts.splice(index, 1);
        this.posts.splice(newIndex, 0, movedPost);

        this.actions.unshift({
          id: Date.now(),
          description: `Moved post ${movedPost.id} from index ${index} to index ${newIndex}`,
        });
        this.postHistory.unshift([...this.posts]);
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
