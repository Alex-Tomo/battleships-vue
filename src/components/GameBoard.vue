<script setup lang='ts'>
import {computed} from 'vue';
import BoardTile from './BoardTile.vue';
import type {Coordinates, Ships} from '../types/common.types.ts';

type Props = {
  rows: number;
  cols: number;
  moves: Coordinates;
  ships: Ships;
};

const props = defineProps<Props>();

const rowsIndexes = computed(() => Array.from({ length: props.rows }, (_, i) => i));
const colsIndexes = computed(() => Array.from({ length: props.cols }, (_, i) => i));

const boardStyle = computed(() => ({
  gridTemplateColumns: `repeat(${props.cols}, 1fr)`,
}));
</script>

<template>
  <div class='board' :style='boardStyle'>
    <div class='column-label' v-for='i in colsIndexes' :key='`col-label-${i}`'>
      {{ i+1 }}
    </div>

    <template v-for='rowIndex in rowsIndexes' :key='`row-${rowIndex}`'>
      <div class='row-label' :style='`top: ${70 + (59 * rowIndex)}px`'>
        {{ String.fromCharCode(65 + rowIndex) }}
      </div>
      <BoardTile
        v-for='colIndex in colsIndexes'
        :key='`col-${rowIndex}-${colIndex}`'
        :row='rowIndex'
        :col='colIndex'
        :targeted='!!props.moves.find(t => t.row === rowIndex && t.col === colIndex)'
        :has-ship='!!props.ships.find(s => s.coords.find(coord => coord.row === rowIndex && coord.col === colIndex))'
      />
    </template>
  </div>
</template>

<style scoped>
.board {
  position: relative;
  display: grid;
  grid-auto-rows: minmax(32px, 1fr);
  gap: 4px;
}

.column-label {
  display: flex;
  justify-content: center;
  align-items: center;
}

.row-label {
  position: absolute;
  left: -30px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>