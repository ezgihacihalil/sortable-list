import { describe, it, beforeEach, expect } from 'vitest';
import { useStore } from '../actions';
import { createPinia } from 'pinia';
import { createApp } from 'vue';
import App from '../../App.vue';
import { Direction } from '@/components/PostList/types.js';

describe('actions', () => {
  let store: ReturnType<typeof useStore>;

  beforeEach(() => {
    const pinia = createPinia();
    const app = createApp(App);
    app.use(pinia);
    store = useStore();
    store.posts = [
      { id: 1, title: 'Title 1' },
      { id: 2, title: 'Title 2' },
      { id: 3, title: 'Title 3' },
      { id: 4, title: 'Title 4' },
      { id: 5, title: 'Title 5' },
    ];
    store.actions = [];
    store.postHistory = [];
  });

  it('should move post up', () => {
    const expectedPostsAfterMove = [
      { id: 2, title: 'Title 2' },
      { id: 1, title: 'Title 1' },
      { id: 3, title: 'Title 3' },
      { id: 4, title: 'Title 4' },
      { id: 5, title: 'Title 5' },
    ];
    store.movePost(1, Direction.Up);
    expect(store.posts).toEqual(expectedPostsAfterMove);
    expect(store.actions[0].description).toBe('Moved post 2 from index 1 to index 0');
    expect(store.postHistory).toEqual([expectedPostsAfterMove]);
  });

  it('should revert to previous state when time traveling', () => {
    const initialPostHistory = [
      [
        { id: 2, title: 'Title 2' },
        { id: 1, title: 'Title 1' },
        { id: 3, title: 'Title 3' },
        { id: 4, title: 'Title 4' },
        { id: 5, title: 'Title 5' },
      ],
      [
        { id: 1, title: 'Title 1' },
        { id: 2, title: 'Title 2' },
        { id: 3, title: 'Title 3' },
        { id: 4, title: 'Title 4' },
        { id: 5, title: 'Title 5' },
      ],
    ];
    const expectedPostsAfterTimeTravel = initialPostHistory[1];

    store.actions = [{ id: 1, description: 'Action 1' }];
    store.postHistory = initialPostHistory;

    store.timeTravel(1);
    expect(store.actions).toEqual([]);
    expect(store.posts).toEqual(expectedPostsAfterTimeTravel);
    expect(store.postHistory).toEqual([expectedPostsAfterTimeTravel]);
  });
});
