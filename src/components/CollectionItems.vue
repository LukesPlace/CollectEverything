<script setup lang="ts">
import type { CollectionItem } from '@/stores/collection';
import Card from './Card.vue';
import { computed } from 'vue';

const props = defineProps<{
  items: Array<CollectionItem>
}>();

// Group items by category
const groupedItems = computed(() => {
  return props.items.reduce((acc, item) => {
    const key = item.category || "Uncategorized";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {} as Record<string, CollectionItem[]>);
});
</script>

<template>
  <div v-for="(items, category) in groupedItems" :key="category" class="category-section">
      <h2 class="category-title">{{ category || "Uncategorized" }}</h2>

      <div class="card-list">
        <div v-for="item in items" :key="item.id" class="item-card">
          <card :collection-item="item"></card>
        </div>
      </div>
    </div>
    <!-- <div v-for="item in props.items">
      <card :collection-item="item"></card>
    </div> -->
    
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

.category-section {
  margin-bottom: 2rem;
}

.category-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.items-list {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.item-card {
  background: #1e1e1e;
  padding: 1rem;
  border-radius: 8px;
  color: #fff;
  width: 200px;
}

.tags-list {
  display: flex;
  gap: 0.25rem;
  flex-wrap: wrap;
  margin-top: 0.5rem;
}

.tags-list li {
  background: var(--primary-green);
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.8rem;
}
</style>