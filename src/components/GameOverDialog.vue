<script setup lang='ts'>
import {ref, watch} from "vue";

const props = defineProps<{
  gameOver: boolean;
  totalMoves: number;
}>();
const emit = defineEmits<{
  (e: 'restart'): void;
}>();

const dialog = ref<HTMLDialogElement | null>(null);

watch(
  () => props.gameOver,
  (newVal) => {
    if (newVal) dialog.value?.showModal();
    else dialog.value?.close();
  },
  { immediate: true }
);
</script>

<template>
  <dialog ref="dialog">
    <h2>Game Over</h2>
    <p>Congratulations! You've sunk all the ships in {{ props.totalMoves }} moves!</p>
    <button @click="emit('restart')">Play Again</button>
  </dialog>
</template>

<style scoped>
dialog {
  border: none;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}
</style>