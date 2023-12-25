import { defineStore } from 'pinia';

export const useStore = defineStore({
  id: 'actions',
  state: () => ({
    actions: []
  }),
  actions: {
    add(action: string) {
      this.actions.unshift(action);
    },
    timeTravel(index: number) {
      this.actions = this.actions.slice(index + 1);
    }
  }
});
