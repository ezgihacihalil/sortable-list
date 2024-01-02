import { render, fireEvent, getByLabelText } from '@testing-library/vue';
import { createApp } from 'vue';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import { useStore } from '@/stores/actions';
import MoveButton from '../PostList/MoveButton.vue';
import App from '../../App.vue';
import { createPinia } from 'pinia';

describe('MoveButton', () => {
  let store: ReturnType<typeof useStore>;

  beforeEach(() => {
    const pinia = createPinia();
    const app = createApp(App);
    app.use(pinia);
    store = useStore();
  });

  it('calls handleMove when button is clicked', async () => {
    const movePostSpy = vi.spyOn(store, 'movePost');

    const { getByRole } = render(MoveButton, {
      props: {
        index: 1,
        direction: 'up',
      },
    });

    await fireEvent.click(getByRole('button'));

    expect(movePostSpy).toHaveBeenCalled();
    expect(movePostSpy).toHaveBeenCalledWith(1, 'up');
  });
});
