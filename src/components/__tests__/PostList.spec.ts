import { render, waitFor } from '@testing-library/vue';
import { createApp, nextTick } from 'vue';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import { useStore } from '@/stores/actions';
import PostList from '../PostList/PostList.vue';
import App from '../../App.vue';
import { createPinia } from 'pinia';
import fetcher from '@/utils/fetcher';

describe('PostList', () => {
  let store: ReturnType<typeof useStore>;

  beforeEach(() => {
    const pinia = createPinia();
    const app = createApp(App);
    app.use(pinia);
    store = useStore();
  });

  it('renders correctly', async () => {
    const fetcherSpy = vi.spyOn(fetcher, 'get').mockReturnValue({
      data: [
        { id: 1, title: 'Title 1' },
        { id: 2, title: 'Title 2' },
        { id: 3, title: 'Title 3' },
        { id: 4, title: 'Title 4' },
        { id: 5, title: 'Title 5' },
        { id: 5, title: 'Title 6' },
      ],
    });

    const { findAllByRole } = render(PostList);

    await nextTick();

    expect(fetcherSpy).toHaveBeenCalledOnce();
    expect(store.posts.length).toBe(5);

    await nextTick();

    const posts = await findAllByRole('article');
    expect(posts.length).toBe(5);

    const moveButtons = await findAllByRole('button');
    expect(moveButtons.length).toBe(8);
  });

  it('should handle error from fetcher', async () => {
    const error = 'Failed to fetch posts';
    const fetcherSpy = vi.spyOn(fetcher, 'get').mockRejectedValue(new Error());

    const { findByText } = render(PostList);

    // Wait for any promises in the component to resolve/reject
    await nextTick();

    expect(fetcherSpy).toHaveBeenCalledOnce();

    await waitFor(() => {
      expect(findByText(error)).toBeTruthy();
    });
  });
});
