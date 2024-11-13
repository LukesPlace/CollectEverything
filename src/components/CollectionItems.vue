<script setup lang="ts">
import type { CollectionItem } from '@/stores/collection';
import Card from './Card.vue';

const props = defineProps<{
  items: Array<CollectionItem>
}>();
</script>

<template>
<div class="card-list">
  <div v-for="item in props.items">
    <card :collection-item="item"></card>
  </div>
</div>
</template>

<style scoped>
.card-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
}

.card-list > div {
  display: flex;
  justify-content: center;
}

/* Desktop and larger screens */
@media (min-width: 1024px) {
  .card-list {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem; /* Increase spacing on larger screens */
  }
}

/* Tablet view */
@media (min-width: 768px) and (max-width: 1023px) {
  .card-list {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); /* Medium-sized cards for tablets */
    gap: 1.75rem;
  }
}

/* Mobile view */
@media (max-width: 767px) {
  .card-list {
    grid-template-columns: 1fr; /* Single-column layout for smaller screens */
    gap: 1.5rem;
  }
}
</style>