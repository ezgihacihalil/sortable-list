import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import MoveButton from '../PostList/MoveButton.vue';

describe('MoveButton', () => {
  it('calls handleMove when button is clicked', async () => {
    const mockStore = {
      movePost: vi.fn(),
    };

    const wrapper = mount(MoveButton, {
      global: {
        provide: {
          useStore: () => mockStore,
        },
      },
      props: {
        index: 1,
        direction: 'up',
      },
    });

    await wrapper.find('button').trigger('click');

    expect(mockStore.movePost).toHaveBeenCalled();
  });
});