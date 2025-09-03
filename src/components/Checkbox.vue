<script setup lang="ts">
  const isChecked = defineModel();
</script>

<template>
  <label class="checkbox-container">
    <input type="checkbox" v-model="isChecked" />
    <span class="checkmark"></span>
    <span class="checkbox-label">Completed</span>
  </label>
</template>

<style scoped>

.checkbox-container {
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 500;
  color: var(--text-color, #ffffff);
  user-select: none;
}

/* Hide the default checkbox */
.checkbox-container input[type="checkbox"] {
  opacity: 0;
  position: absolute;
  pointer-events: none;
}


.checkmark {
  width: 20px;
  height: 20px;
  background-color: var(--checkbox-bg, #2e2e2e);
  border: 2px solid var(--checkbox-border, #444);
  border-radius: 4px;
  position: relative;
  transition: background-color 0.3s, border-color 0.3s;
  display: inline-block;
  margin-right: 0.5rem;
}

/* Checkmark appearance when checked */
.checkbox-container input[type="checkbox"]:checked + .checkmark {
  background-color: var(--primary-green, #32cd32);
  border-color: var(--primary-green, #32cd32);
}

/* Checkmark icon */
.checkmark::after {
  content: "";
  position: absolute;
  left: 5px;
  top: 1px;
  width: 6px;
  height: 12px;
  border: solid #ffffff;
  border-width: 0 2px 2px 0;
  transform: scale(0) rotate(45deg);
  opacity: 0;
  transition: transform 0.2s ease, opacity 0.2s ease;
}

/* Show the checkmark when checked */
.checkbox-container input[type="checkbox"]:checked + .checkmark::after {
  transform: scale(1) rotate(45deg);
  opacity: 1;
}

.checkbox-label {
  font-size: 1rem;
  color: var(--text-color, #cccccc);
}
</style>
