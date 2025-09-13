<script setup lang='ts'>
import generateShips from './utils/ship.ts';
import GameBoard from './components/GameBoard.vue';
import GameInfo from "./components/GameInfo.vue";

const ships = generateShips();
</script>

<template>
  <GameInfo
    :moves="0"
    :ships-remaining="3"
    :last-hit="undefined"
  />
  <GameBoard
    :rows='9'
    :cols='9'
    :ships='ships'
  />
</template>

<style scoped>
</style>
