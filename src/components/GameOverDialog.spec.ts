// @vitest-environment jsdom

import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import GameOverDialog from './GameOverDialog.vue';

describe('GameOverDialog', () => {
  it('shows dialog when gameOver is true', async () => {
    const wrapper = mount(GameOverDialog, {
      props: { gameOver: true, totalMoves: 7 }
    });
    expect(wrapper.text()).toContain('Game Over');
    expect(wrapper.text()).toContain("You've sunk all the ships in 7 moves!");
  });

  it('hides dialog when gameOver is false', async () => {
    const wrapper = mount(GameOverDialog, {
      props: { gameOver: false, totalMoves: 5 }
    });
    const dialog = wrapper.find('dialog').element as HTMLDialogElement;
    expect(dialog.open).toBe(false);
  });

  it('emits restart event when button is clicked', async () => {
    const wrapper = mount(GameOverDialog, {
      props: { gameOver: true, totalMoves: 3 }
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('restart')).toBeTruthy();
  });
});