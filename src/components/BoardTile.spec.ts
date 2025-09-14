// @vitest-environment jsdom

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import BoardTile from './BoardTile.vue';

describe('BoardTile', () => {
  it('renders hit state', () => {
    const wrapper = mount(BoardTile, {
      props: { row: 0, col: 0, targeted: true, hasShip: true }
    });
    expect(wrapper.classes()).toContain('hit');
    expect(wrapper.text()).toBe('●');
  });

  it('renders miss state', () => {
    const wrapper = mount(BoardTile, {
      props: { row: 1, col: 1, targeted: true, hasShip: false }
    });
    expect(wrapper.classes()).toContain('miss');
    expect(wrapper.text()).toBe('×');
  });

  it('renders untouched state', () => {
    const wrapper = mount(BoardTile, {
      props: { row: 2, col: 2, targeted: false, hasShip: false }
    });
    expect(wrapper.classes()).not.toContain('hit');
    expect(wrapper.classes()).not.toContain('miss');
    expect(wrapper.text()).toBe('');
  });
});