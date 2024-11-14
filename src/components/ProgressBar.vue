<template>
  <div class="progress-bar-container" :class="{ 'completed': completionPercentage === 100 }">
    <div class="progress-bar" :style="{ width: `${completionPercentage}%` }"></div>
    <span class="progress-text">{{ props.completedItems }}/{{ props.totalItems }} - {{ completionPercentage }}%</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  completedItems: number,
  totalItems: number,
}>();

const completionPercentage = computed(() => {
  const percentage = Math.round((props.completedItems / props.totalItems) * 100);
  return !isNaN(percentage) ? percentage : 0;
});
</script>

<style scoped>
.progress-bar-container {
  position: relative;
  background-color: #333;
  border-radius: 10px;
  overflow: hidden;
  height: 30px;
  width: 100%;
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.25);
  margin: 1rem 0;
  transition: transform 0.3s ease; /* Bounce effect when completed */
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #34d399, #4caf50);
  border-radius: 10px;
  transition: width 0.5s ease;
  box-shadow: 0 0 15px rgba(52, 211, 153, 0.5), inset 0 0 5px rgba(0, 0, 0, 0.2);
}

.progress-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  overflow: hidden;
  white-space: nowrap;
}

.completed {
  animation: bounce 0.5s ease;
}

@keyframes bounce {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

</style>
