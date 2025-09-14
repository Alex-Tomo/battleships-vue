import { describe, it, expect } from 'vitest';
import generateShips, { coordinatesMatch, coordinatesOverlap } from './ship';

describe('generateShips', () => {
  it('generates the correct number of ships', () => {
    const ships = generateShips({ lengths: [5, 4], gridSize: { rows: 10, cols: 10 } });
    expect(ships.length).toBe(2);
  });
  it('generates the correct number of ships with various sizes', () => {
    const ships = generateShips({ lengths: [5, 4, 3, 2, 1], gridSize: { rows: 10, cols: 10 } });
    expect(ships.length).toBe(5);
  });

  it('places ships with correct lengths', () => {
    const ships = generateShips({ lengths: [5, 4], gridSize: { rows: 10, cols: 10 } });
    expect(ships[0].coords.length).toBe(5);
    expect(ships[1].coords.length).toBe(4);
  });

  it('does not overlap ships', () => {
    const ships = generateShips({ lengths: [5, 4], gridSize: { rows: 10, cols: 10 } });
    expect(coordinatesOverlap(ships[0].coords, ships[1].coords)).toBe(false);
  });

  it('places ships within grid bounds', () => {
    const gridSize = { rows: 10, cols: 10 };
    const ships = generateShips({ lengths: [5, 4], gridSize });
    for (const ship of ships) {
      for (const coord of ship.coords) {
        expect(coord.row).toBeGreaterThanOrEqual(0);
        expect(coord.row).toBeLessThan(gridSize.rows);
        expect(coord.col).toBeGreaterThanOrEqual(0);
        expect(coord.col).toBeLessThan(gridSize.cols);
      }
    }
  });
});

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

describe('coordinatesOverlap', () => {
  it('returns true if there is at least one overlapping coordinate', () => {
    const a = [{ row: 1, col: 2 }, { row: 3, col: 4 }];
    const b = [{ row: 3, col: 4 }, { row: 5, col: 6 }];
    expect(coordinatesOverlap(a, b)).toBe(true);
  });

  it('returns false if there are no overlapping coordinates', () => {
    const a = [{ row: 1, col: 2 }];
    const b = [{ row: 3, col: 4 }];
    expect(coordinatesOverlap(a, b)).toBe(false);
  });

  it('returns false if either array is empty', () => {
    expect(coordinatesOverlap([], [{ row: 1, col: 2 }])).toBe(false);
    expect(coordinatesOverlap([{ row: 1, col: 2 }], [])).toBe(false);
    expect(coordinatesOverlap([], [])).toBe(false);
  });

  it('returns true if all coordinates overlap', () => {
    const a = [{ row: 1, col: 2 }, { row: 3, col: 4 }];
    const b = [{ row: 1, col: 2 }, { row: 3, col: 4 }];
    expect(coordinatesOverlap(a, b)).toBe(true);
  });
});