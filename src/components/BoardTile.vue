<script setup lang='ts'>
import { computed } from 'vue';

type Props = {
  row: number;
  col: number;
  targeted: boolean;
  hasShip: boolean;
};

const props = defineProps<Props>();

const hasFog = computed(() => !props.targeted);
const isHit = computed(() => props.targeted && props.hasShip);
const isMiss = computed(() => props.targeted && !props.hasShip);
</script>

<template>
  <div
    class='tile'
    :class='{
      fog: hasFog,
      hit: isHit,
      miss: isMiss,
      ship: hasShip,
    }'
  >
    <span v-if='isHit'>●</span>
    <span v-else-if='isMiss'>×</span>
    <span v-else>&nbsp;</span>
  </div>
</template>

<style scoped>
.tile {
  min-width: 55px;
  min-height: 55px;
  background: #252323;
  border: 1px solid #444;
  font-size: 1.5rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &.hit {
    background: #8B0000;
    color: white;
  }

  &.miss {
    background: #006cdc;
    color: white;
  }
}
</style>