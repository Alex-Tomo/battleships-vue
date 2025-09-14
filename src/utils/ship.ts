import type {Coordinate} from "../types/common.types.ts";

export default function generateShips(data: {
  lengths: number[];
}) {
  // TODO: implement random ship placement algorithm
  // TODO: implement lengths from data

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
        { col: 1, row: 0 },
        { col: 1, row: 1 },
        { col: 1, row: 2 },
        { col: 1, row: 3 }
      ]
    },
    {
      name: "Destroyer",
      coords: [
        { col: 2, row: 0 },
        { col: 2, row: 1 },
        { col: 2, row: 2 },
        { col: 2, row: 3 },
      ]
    },
  ];
}

export function coordinatesMatch(a: Coordinate, b: Coordinate): boolean {
  return a.row === b.row && a.col === b.col;
}
