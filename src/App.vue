<script setup lang='ts'>
import generateShips from './utils/ship.ts';
import GameBoard from './components/GameBoard.vue';
import GameInfo from "./components/GameInfo.vue";
import PlayerInput from "./components/PlayerInput.vue";
import {computed, ref} from "vue";

const ships = generateShips();

const rows = 9;
const cols = 9;

const moves = ref<{
  row: number;
  col: number;
}[]>([]);

const lastMoveHit = computed(() => {
  if (moves.value.length === 0) return undefined;

  const lastMove = moves.value[moves.value.length - 1];
  return !!ships.find(s => s.coords.find(c => c.row === lastMove.row && c.col === lastMove.col));
})

const shipsRemaining = computed(() => {
  return ships.filter(s => !s.coords.every(c => moves.value.find(m => m.row === c.row && m.col === c.col))).length;
});

const lastMoveSankShip = computed(() => {
  if (moves.value.length === 0) return false;

  const lastMove = moves.value[moves.value.length - 1];
  return ships.some(s => s.coords.some(c => c.row === lastMove.row && c.col === lastMove.col) &&
    s.coords.every(c => moves.value.find(m => m.row === c.row && m.col === c.col)));
});
</script>

<template>
  <GameInfo
    :moves="moves.length"
    :ships-remaining="shipsRemaining"
    :last-hit="lastMoveHit"
    :last-move-sank-ship="lastMoveSankShip"
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
    @fire='(move: string) => {
      const letter = move.slice(0, 1);
      const number = move.slice(1);

      // Check if the player has already fired at this location
      if (moves.find(m => m.row === (letter.charCodeAt(0) - 65) && m.col === (Number(number) - 1))) {
        console.log("Already fired at this location");
        return;
      }

      moves.push({
        row: letter.charCodeAt(0) - 65,
        col: Number(number) - 1,
      });
    }'
  />
</template>

<style scoped>
</style>
