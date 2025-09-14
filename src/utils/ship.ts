import type {Coordinate, Ships} from '../types/common.types.ts';

// Randomly generate ships on an X by Y grid
// Rules:
// 1. Ships cannot overlap
// 2. Ships must be placed either horizontally or vertically
// 3. Ships must be fully within the grid
export default function generateShips(data: {
  lengths: number[];
  gridSize: { rows: number; cols: number };
}): Ships {
  // These are the coordinates that are already taken by ships
  const takenCoords: Coordinate[] = [];

  // Ship give us the names of the ship by length
  const shipTypes = [
    { name: 'Battleship', length: 5 },
    { name: 'Destroyer', length: 4 },
  ];

  const ships: Ships = [];

  for (let length of data.lengths) {
    const shipType = shipTypes.find(ship => ship.length === length);
    if (!shipType) continue;

    // Try to place the ship until we succeed, placement may fail due to overlap
    let placed = false;
    while (!placed) {
      // Randomly choose orientation
      const isHorizontal = Math.random() < 0.5;

      // Randomly choose starting point
      const startRow = Math.floor(Math.random() * data.gridSize.rows);
      const startCol = Math.floor(Math.random() * data.gridSize.cols);

      // Generate the coordinates for the ship
      const newCoords: Coordinate[] = [];
      for (let i = 0; i < length; i++) {
        // if horizontal, row stays the same, col increases
        // if vertical, col stays the same, row increases
        const row = isHorizontal ? startRow : startRow + i;
        const col = isHorizontal ? startCol + i : startCol;

        // If the ship goes out of bounds and we will try again
        if (row >= data.gridSize.rows || col >= data.gridSize.cols) break;

        newCoords.push({ row, col });
      }

      // If we didn't get enough coordinates, it means we went out of bounds
      if (newCoords.length !== length) continue;

      // Check for overlap
      const overlap = newCoords.some(coord =>
        takenCoords.some(taken => coordinatesMatch(coord, taken))
      );

      if (overlap) continue;

      // We successfully placed the ship
      takenCoords.push(...newCoords);
      placed = true;

      ships.push({ name: shipType.name, coords: newCoords } );
    }
  }

  return ships;
}

// Check if two coordinates are the same
export function coordinatesMatch(a: Coordinate, b: Coordinate): boolean {
  return a.row === b.row && a.col === b.col;
}
