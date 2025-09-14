// @vitest-environment jsdom

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import GameBoard from './GameBoard.vue';

const ships = [
  { name: 'Destroyer', coords: [{ row: 0, col: 1 }, { row: 0, col: 2 }] },
  { name: 'Submarine', coords: [{ row: 2, col: 0 }] }
];

describe('GameBoard', () => {
  it('renders correct number of tiles and labels', () => {
    const wrapper = mount(GameBoard, {
      props: { rows: 3, cols: 3, moves: [], ships }
    });
    // 3 column labels
    expect(wrapper.findAll('.column-label')).toHaveLength(3);
    // 3 row labels
    expect(wrapper.findAll('.row-label')).toHaveLength(3);
    // 3x3 = 9 BoardTile components
    expect(wrapper.findAllComponents({ name: 'BoardTile' })).toHaveLength(9);
  });

  it('marks tiles as targeted and with ship', () => {
    const moves = [{ row: 0, col: 1 }, { row: 1, col: 1 }];
    const wrapper = mount(GameBoard, {
      props: { rows: 3, cols: 3, moves, ships }
    });
    const tiles = wrapper.findAllComponents({ name: 'BoardTile' });
    // (0,1) is a hit (has ship and targeted)
    const hitTile = tiles.find(t => t.props('row') === 0 && t.props('col') === 1);
    expect(hitTile?.props('targeted')).toBe(true);
    expect(hitTile?.props('hasShip')).toBe(true);
    // (1,1) is a miss (targeted, no ship)
    const missTile = tiles.find(t => t.props('row') === 1 && t.props('col') === 1);
    expect(missTile?.props('targeted')).toBe(true);
    expect(missTile?.props('hasShip')).toBe(false);
    // (2,0) is not targeted but has ship
    const shipTile = tiles.find(t => t.props('row') === 2 && t.props('col') === 0);
    expect(shipTile?.props('targeted')).toBe(false);
    expect(shipTile?.props('hasShip')).toBe(true);
  });
});