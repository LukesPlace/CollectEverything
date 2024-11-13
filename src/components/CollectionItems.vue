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

<style>

.card-list { 
  width: 100%;
  display: grid;
  grid-template-columns: 20% 20% 20% 20%;
  grid-template-rows: 20% 20%;
  gap: 5rem;
}

.card-list > div > img {
  width: 100%;
}
</style>