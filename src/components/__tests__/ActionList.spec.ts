import { render, fireEvent } from '@testing-library/vue';
import { createApp } from 'vue';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import { useStore } from '@/stores/actions';
import ActionList from '../ActionList.vue';
import App from '../../App.vue';
import { createPinia } from 'pinia';

describe('ActionList', () => {
  let store: ReturnType<typeof useStore>;

  beforeEach(() => {
    const pinia = createPinia();
    const app = createApp(App);
    app.use(pinia);
    store = useStore();
  });

  it('calls timeTravel on button click', async () => {
    store.posts = [
      { id: 2, title: 'Title 2' },
      { id: 1, title: 'Title 1' },
      { id: 3, title: 'Title 3' },
      { id: 4, title: 'Title 4' },
      { id: 5, title: 'Title 5' },
    ];
    store.actions = [{ id: 1, description: 'Action 1' }];
    store.postHistory = [
      [
        { id: 1, title: 'Title 1' },
        { id: 2, title: 'Title 2' },
        { id: 3, title: 'Title 3' },
        { id: 4, title: 'Title 4' },
        { id: 5, title: 'Title 5' },
      ],
      [
        { id: 2, title: 'Title 2' },
        { id: 1, title: 'Title 1' },
        { id: 3, title: 'Title 3' },
        { id: 4, title: 'Title 4' },
        { id: 5, title: 'Title 5' },
      ],
    ];

    const timeTravelSpy = vi.spyOn(store, 'timeTravel');

    const { getByRole } = render(ActionList);

    await fireEvent.click(getByRole('button'));

    expect(timeTravelSpy).toBeCalledWith(1);
  });
});
