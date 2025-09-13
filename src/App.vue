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

// When this hits zero we will show a "You win!" message with a reset button
const shipsRemaining = computed(() => {
  return ships.filter(s => !s.coords.every(coord => moves.value.find(m => m.row === coord.row && m.col === coord.col))).length;
});
</script>

<template>
  <GameInfo
    :moves="moves"
    :ships="ships"
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
