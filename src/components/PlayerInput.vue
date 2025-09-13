<script setup lang="ts">
import {ref} from "vue";

const props = defineProps<{
  rows: number;
  cols: number;
}>();
const emit = defineEmits<{
  (e: 'fire', move: string): void;
}>();

const playerInput = ref('');

function onFire() {
  if (!playerInput.value) return;
  if (playerInput.value.length < 2) return;

  // a1 -> A1
  const value = playerInput.value.toUpperCase();

  const letter = value.slice(0, 1);
  const number = value.slice(1);

  // A is always valid, up to the number of rows
  const letterIsValid = letter >= 'A' && letter < String.fromCharCode(65 + (props.rows));
  const numberIsValid = !isNaN(Number(number)) && Number(number) >= 0 && Number(number) <= props.cols;

  if (!letterIsValid || !numberIsValid) {
    alert('Please enter a valid tile, i.e. A1');
  }

  emit('fire', playerInput.value.toUpperCase());
  playerInput.value = '';
}
</script>

<template>
  <div class="player-input">
    <input
      placeholder="A1"
      v-model="playerInput"
    />
    <button
      type="button"
      @click="onFire"
    >
      Fire!
    </button>
  </div>
</template>

<style scoped>
.player-input {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;

  input {
    padding: 8px;
    font-size: 16px;
    border: 1px solid #444;
    border-radius: 4px;
    width: 3rem;
  }
}
</style>