<script setup lang='ts'>
import {computed, type ComputedRef} from "vue";
import type {Coordinates, Ships} from "../types/common.types.ts";
import {coordinatesMatch} from "../utils/ship.ts";

const props = defineProps<{
  moves: Coordinates;
  ships: Ships;
}>();

const lastMoveHit: ComputedRef<boolean> = computed(() => {
  if (props.moves.length === 0) return false;

  const lastMove = props.moves[props.moves.length - 1];
  return props.ships.some(s => s.coords.some(coord => coordinatesMatch(coord, lastMove)));
})

const shipsRemaining: ComputedRef<number> = computed(() => {
  return props.ships.filter(s => !s.coords.every(coord => props.moves.find(m => coordinatesMatch(m, coord)))).length;
});

const lastMoveSankShip: ComputedRef<boolean> = computed(() => {
  if (props.moves.length === 0) return false;

  const lastMove = props.moves[props.moves.length - 1];
  return props.ships.some(s => s.coords.some(coord => coordinatesMatch(coord, lastMove)) && s.coords.every(coord => props.moves.find(m => coordinatesMatch(m, coord))));
});

const lastMoveMessage: ComputedRef<string> = computed(() => {
  if (props.moves.length === 0) return "Make your first move!";
  if (lastMoveHit.value && lastMoveSankShip.value) {
    const lastMove = props.moves[props.moves.length - 1];
    const sunkShip = props.ships.find(s => s.coords.some(coord => coordinatesMatch(coord, lastMove) && s.coords.every(coord => props.moves.find(m => coordinatesMatch(m, coord)))));
    return `You sank the ${sunkShip?.name}!`;
  }
  if (lastMoveHit.value) return "You hit a ship!";
  return "You missed!";
});
</script>

<template>
  <div class='game-info'>
    <div>Moves: {{ props.moves.length }}</div>
    <div>{{ shipsRemaining }} ships remaining</div>
    <div>{{ lastMoveMessage }}</div>
  </div>
</template>

<style scoped>
.game-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1rem;
  border: 1px solid #444;
  border-radius: 12px;
  height: 3rem;
}
</style>