# Battleships

## Tech Stack
- Vue 3
- Vite
- TypeScript

## Tool Versions
- Node - v22.2.0
- npm - v10.7.0

## Feature Requirements
- [x] Resizeable game board - initially 10x10
- [x] Resizeable ships - initially 1 x 5 and 2 x 4
  - [x] Ships must be placed on the board at random
  - [x] Ships cannot overlap
  - [x] Ships cannot be placed outside the game board
  - [x] Ships can be rotated 90 degrees
- [x] Heads up display of remaining ships and game info so far 
  - [x] Number of ships remaining
  - [x] If the last attack was a hit or miss
  - [x] If a ship has been sunk on the last attack and which ship it was
- [x] Form for user to enter their attack coordinates 
  - [x] User cannot enter coordinates they have already attacked
  - [x] User cannot enter coordinates outside the game board
- [x] End screen when all ships have been sunk
  - [x] Display number of turns taken to sink all ships
  - [x] Button to start a new game

## Nice to haves
- [ ] Draggable ships to place on the board instead of random placement
- [ ] Multiplayer mode/AI opponent
- [ ] More ships in a single game
- [ ] Button to restart the game at any time


## Getting Started
1. Clone the repository:
```
git clone xxx
```

2. Navigate to the project directory:
```
cd xxx
```

3. Install dependencies:
```
npm install
```

## Running the Application in Development Mode
```
npm run dev
```

## Building the Application
```
npm run build
```

## Previewing the Production Build (After Building the Application)
```
npm run preview
```