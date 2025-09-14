// @vitest-environment jsdom

import { describe, it, expect, vi, beforeEach, beforeAll } from 'vitest';
import { mount } from '@vue/test-utils';
import App from './App.vue';

vi.mock('./utils/ship.ts', () => ({
  default: vi.fn(() => [
    { name: 'TestShip', coords: [{ row: 0, col: 0 }] }
  ]),
  coordinatesMatch: (a: { row: number, col: number }, b: { row: number, col: number }) => a.row === b.row && a.col === b.col
}));

describe('App.vue', () => {
  let wrapper: ReturnType<typeof mount>;

  beforeAll(() => {
    window.HTMLDialogElement.prototype.showModal = function () {};
    window.HTMLDialogElement.prototype.close = function () {};
  });

  beforeEach(() => {
    wrapper = mount(App);
  });

  it('renders GameInfo, GameBoard, PlayerInput, and GameOverDialog', () => {
    expect(wrapper.findComponent({ name: 'GameInfo' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'GameBoard' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'PlayerInput' }).exists()).toBe(true);
    expect(wrapper.findComponent({ name: 'GameOverDialog' }).exists()).toBe(true);
  });

  it('adds a move when PlayerInput emits fire', async () => {
    const setupState = (wrapper.vm as any).$?.setupState;

    const input = wrapper.findComponent({ name: 'PlayerInput' });
    await input.vm.$emit('fire', 'A1');
    expect(setupState.moves.length).toBe(1);
    expect(setupState.moves[0]).toEqual({ row: 0, col: 0 });
  });

  it('prevents duplicate moves', async () => {
    const setupState = (wrapper.vm as any).$?.setupState;

    const input = wrapper.findComponent({ name: 'PlayerInput' });
    window.alert = vi.fn();
    await input.vm.$emit('fire', 'A1');
    await input.vm.$emit('fire', 'A1');
    expect(window.alert).toHaveBeenCalledWith('Already fired at this location');
    expect(setupState.moves.length).toBe(1);
  });

  it('resets game on restart', async () => {
    const setupState = (wrapper.vm as any).$?.setupState;

    const input = wrapper.findComponent({ name: 'PlayerInput' });
    await input.vm.$emit('fire', 'A1');
    const dialog = wrapper.findComponent({ name: 'GameOverDialog' });
    await dialog.vm.$emit('restart');
    expect(setupState.moves.length).toBe(0);
    expect(setupState.ships.length).toBeGreaterThan(0);
  });

  it('sets gameOver to true when all ships are sunk', async () => {
    const setupState = (wrapper.vm as any).$?.setupState;

    // Sink the only test ship
    const input = wrapper.findComponent({ name: 'PlayerInput' });
    await input.vm.$emit('fire', 'A1');
    expect(setupState.gameOver).toBe(true);
  });
});