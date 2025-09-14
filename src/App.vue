<script setup lang='ts'>
import generateShips from './utils/ship.ts';
import GameBoard from './components/GameBoard.vue';
import GameInfo from './components/GameInfo.vue';
import PlayerInput from './components/PlayerInput.vue';
import {computed, ref} from 'vue';
import GameOverDialog from './components/GameOverDialog.vue';

const rows = 9;
const cols = 9;

const ships = ref(generateShips({ lengths: [5, 4, 4], gridSize: { rows, cols } }));
const moves = ref<{ row: number; col: number; }[]>([]);
const key = ref(0);

// Checks if all ships have been sunk
const gameOver = computed(() => {
  return ships.value.filter(s => !s.coords.every(coord => moves.value.find(m => m.row === coord.row && m.col === coord.col))).length === 0;
});

// When the player fires at a location
const onFire = (move: string) => {
  const letter = move.slice(0, 1);
  const number = move.slice(1);

  // Check if the player has already fired at this location
  if (moves.value.find(m => m.row === (letter.charCodeAt(0) - 65) && m.col === (Number(number) - 1))) {
    console.log('Already fired at this location');
    return;
  }

  moves.value.push({
    row: letter.charCodeAt(0) - 65,
    col: Number(number) - 1,
  });
};

// When the player presses the play again button
const onRestart = () => {
  moves.value = [];
  ships.value = generateShips({ lengths: [5, 4, 4], gridSize: { rows, cols } });
  key.value += 1;
};
</script>

<template :key='key'>
  <GameInfo
    :moves='moves'
    :ships='ships'
  />
  <GameBoard
    :rows='rows'
    :cols='cols'
    :moves='moves'
    :ships='ships'
  />
  <PlayerInput
    :rows='rows'
    :cols='cols'
    @fire='onFire'
  />

  <GameOverDialog
    :game-over='gameOver'
    :total-moves='moves.length'
    @restart='onRestart'
  />
</template>

<style scoped>
</style>
