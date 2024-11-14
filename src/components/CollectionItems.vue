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
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  box-sizing: border-box;
}

.card-list > div {
  display: flex;
  justify-content: center;
}

@media (min-width: 1024px) {
  .card-list {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 2rem;
  }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .card-list {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1.5rem;
  }
}

/* Small screen view */
@media (max-width: 767px) {
  .card-list {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 1rem;
  }
}
</style>