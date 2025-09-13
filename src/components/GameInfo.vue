<script setup lang='ts'>
const props = defineProps<{
  moves?: number;
  shipsRemaining?: number;
  lastHit?: boolean;
}>();
</script>

<template>
  <div class='game-info'>
    <div>Moves: {{ props.moves }}</div>
    <div>{{ props.shipsRemaining }} ships remaining</div>
    <div>
      <span v-if="props.lastHit !== undefined">
        {{ props.lastHit ? 'Hit!' : 'Miss!' }}
      </span>
    </div>
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