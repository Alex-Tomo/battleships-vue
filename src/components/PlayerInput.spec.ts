// @vitest-environment jsdom

import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import PlayerInput from './PlayerInput.vue';

describe('PlayerInput', () => {
  it('alerts if input is empty', async () => {
    window.alert = vi.fn();
    const wrapper = mount(PlayerInput, { props: { rows: 10, cols: 10 } });
    await wrapper.find('button').trigger('click');
    expect(window.alert).toHaveBeenCalledWith('Please enter a tile, i.e. A1');
  });

  it('alerts if input is too short', async () => {
    window.alert = vi.fn();
    const wrapper = mount(PlayerInput, { props: { rows: 10, cols: 10 } });
    await wrapper.find('input').setValue('A');
    await wrapper.find('button').trigger('click');
    expect(window.alert).toHaveBeenCalledWith('Please enter a valid tile, i.e. A1');
  });

  it('alerts if input is out of bounds', async () => {
    window.alert = vi.fn();
    const wrapper = mount(PlayerInput, { props: { rows: 2, cols: 2 } });
    await wrapper.find('input').setValue('C3');
    await wrapper.find('button').trigger('click');
    expect(window.alert).toHaveBeenCalledWith('Please enter a valid tile, i.e. A1');
  });

  it('emits fire event with valid input', async () => {
    window.alert = vi.fn();
    const wrapper = mount(PlayerInput, { props: { rows: 10, cols: 10 } });
    await wrapper.find('input').setValue('b2');
    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted('fire')).toBeTruthy();
    expect(wrapper.emitted('fire')![0]).toEqual(['B2']);
  });
});