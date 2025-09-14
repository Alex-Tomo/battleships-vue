import { describe, it, expect } from 'vitest';
import { coordinatesMatch } from './ship';

describe('coordinatesMatch', () => {
  it('returns true for identical coordinates', () => {
    expect(coordinatesMatch({ row: 1, col: 2 }, { row: 1, col: 2 })).toBe(true);
  });

  it('returns false for different rows', () => {
    expect(coordinatesMatch({ row: 1, col: 2 }, { row: 2, col: 2 })).toBe(false);
  });

  it('returns false for different columns', () => {
    expect(coordinatesMatch({ row: 1, col: 2 }, { row: 1, col: 3 })).toBe(false);
  });

  it('returns false for completely different coordinates', () => {
    expect(coordinatesMatch({ row: 0, col: 0 }, { row: 9, col: 9 })).toBe(false);
  });
});