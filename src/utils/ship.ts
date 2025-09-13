import type {Coordinate} from "../types/common.types.ts";

export default function generateShips() {
  return [
    {
      name: "Battleship",
      coords: [
        { col: 0, row: 0 },
        { col: 0, row: 1 },
        { col: 0, row: 2 },
        { col: 0, row: 3 },
        { col: 0, row: 4 },
      ]
    },
    {
      name: "Destroyer",
      coords: [
        { col: 2, row: 2 },
        { col: 2, row: 3 },
        { col: 2, row: 4 },
        { col: 2, row: 5 },
      ]
    },
    {
      name: "Destroyer",
      coords: [
        { col: 5, row: 5 },
        { col: 6, row: 5 },
        { col: 7, row: 5 },
        { col: 8, row: 5 },
      ]
    },
  ];
}

export function coordinatesMatch(a: Coordinate, b: Coordinate): boolean {
  return a.row === b.row && a.col === b.col;
}
