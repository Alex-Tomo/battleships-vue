<script setup lang='ts'>
import GameBoard from './components/GameBoard.vue';
import generateShips from './utils/ship.ts';

const ships = generateShips();
</script>

<template>
  <GameBoard
    :rows='9'
    :cols='9'
    :ships='ships'
  />
</template>

<style scoped>
</style>
