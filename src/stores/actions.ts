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
    createAction(id: number, description: string) {
      this.actions.unshift({ id, description });
      this.postHistory.unshift([...this.posts]);
    },
    add(id: number, description: string) {
      this.actions.unshift({ id, description });
      this.postHistory.unshift([...this.posts]);
    },
    updatePostHistory() {
      const actionId = Date.now();
      const description = 'Updated post history';
      this.createAction(actionId, description);
    },    
    movePost(index: number, direction: Direction) {
      const newIndex = direction === Direction.Up ? index - 1 : index + 1;
    
      if (newIndex >= 0 && newIndex < this.posts.length) {
        const [movedPost] = this.posts.splice(index, 1);
        this.posts.splice(newIndex, 0, movedPost);
    
        const actionId = Date.now();
        const description = `Moved post ${movedPost.id} from index ${index} to index ${newIndex}`;
        this.createAction(actionId, description);
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
