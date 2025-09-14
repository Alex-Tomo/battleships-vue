// @vitest-environment jsdom

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import GameInfo from './GameInfo.vue';

const ships = [
  { name: 'Destroyer', coords: [{ row: 0, col: 0 }, { row: 0, col: 1 }] },
  { name: 'Submarine', coords: [{ row: 2, col: 2 }] }
];

describe('GameInfo', () => {
  it('shows initial state', () => {
    const wrapper = mount(GameInfo, { props: { moves: [], ships } });
    expect(wrapper.text()).toContain('Moves: 0');
    expect(wrapper.text()).toContain('2 ships remaining');
    expect(wrapper.text()).toContain('Make your first move!');
  });

  it('shows missed move', () => {
    const wrapper = mount(GameInfo, { props: { moves: [{ row: 5, col: 5 }], ships } });
    expect(wrapper.text()).toContain('Moves: 1');
    expect(wrapper.text()).toContain('2 ships remaining');
    expect(wrapper.text()).toContain('You missed!');
  });

  it('shows hit but not sunk', () => {
    const wrapper = mount(GameInfo, { props: { moves: [{ row: 0, col: 0 }], ships } });
    expect(wrapper.text()).toContain('Moves: 1');
    expect(wrapper.text()).toContain('2 ships remaining');
    expect(wrapper.text()).toContain('You hit a ship!');
  });

  it('shows ship sunk', () => {
    const wrapper = mount(GameInfo, { props: { moves: [{ row: 0, col: 0 }, { row: 0, col: 1 }], ships } });
    expect(wrapper.text()).toContain('Moves: 2');
    expect(wrapper.text()).toContain('1 ships remaining');
    expect(wrapper.text()).toContain('You sank the Destroyer!');
  });

  it('shows all ships sunk', () => {
    const wrapper = mount(GameInfo, { props: { moves: [{ row: 0, col: 0 }, { row: 0, col: 1 }, { row: 2, col: 2 }], ships } });
    expect(wrapper.text()).toContain('Moves: 3');
    expect(wrapper.text()).toContain('0 ships remaining');
    expect(wrapper.text()).toContain('You sank the Submarine!');
  });
});