<script setup lang="ts">
  const checked = defineModel();

  const props = defineProps<{
    checkedState: string,
    uncheckedState: string
  }>();

  function toggleChecked() {
    checked.value = !checked.value;
  }
</script>

<template>
  <button :class="['toggle-btn', { 'checked': !checked }]" @click="toggleChecked">{{ checked ? props.checkedState : props.uncheckedState }}</button>
</template>

<style scoped>

.toggle-btn {
  background-color: var(--primary-green);
  color: white;
  padding: 0.75em 1.5em;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.toggle-btn:hover {
  background-color:  var(--primary-green);
}

.toggle-btn:active {
  transform: scale(0.98); /* Slight shrink on click */
}

</style>
