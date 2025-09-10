<script setup lang='ts'>
import { computed } from 'vue';

type Props = {
  row: number;
  col: number;
  targeted: boolean;
  hasShip: boolean;
};

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: 'fire', payload: { row: number, col: number }): void;
}>();

const hasFog = computed(() => !props.targeted);
const isHit = computed(() => props.targeted && props.hasShip);
const isMiss = computed(() => props.targeted && !props.hasShip);

function onClick() {
  if (!props.targeted)
    emit('fire', { row: props.row, col: props.col });
}
</script>

<template>
  <button
    class='tile'
    :class='{
      fog: hasFog,
      hit: isHit,
      miss: isMiss,
      ship: hasShip,
    }'
    @click='onClick'
  >
    <span v-if='isHit'>●</span>
    <span v-else-if='isMiss'>×</span>
    <span v-else>&nbsp;</span>
  </button>
</template>

<style scoped>
.tile {
  min-width: 55px;
  min-height: 55px;
}
</style>