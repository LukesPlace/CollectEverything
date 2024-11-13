<script setup lang="ts">
import { type CollectionItem } from '@/stores/collection';
import CardDetails from './CardDetails.vue';
import { ref, type Ref } from 'vue';

const props = defineProps<{
  collectionItem: CollectionItem
}>();

const showCardDetails: Ref<boolean> = ref(false);

function onShowCardDetails() {
  showCardDetails.value = true;
}

function onDialogClose() {
  showCardDetails.value = false;
}

function onDialogSave() {
  showCardDetails.value = false;

}


</script>

<template>
  <div class="card">
    <img src="https://via.placeholder.com/300x200" alt="Card image" class="card-image" />
    <div class="card-content">
      <h3 class="card-title">{{ props.collectionItem.name ?? 'New item'}}</h3>
      <p class="card-description">{{ props.collectionItem.description }}</p>
      <button @click="onShowCardDetails" class="card-button">Details</button>
    </div>
  </div>

  <card-details :is-visible="showCardDetails" :item="collectionItem" @save="onDialogSave" @close="onDialogClose"></card-details>
</template>

<style scoped>
.card {
  background-color: var(--card-bg, #1e1e1e);
  color: var(--text-color, #ffffff);
  border-radius: 12px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  max-width: 300px;
  margin: 1rem;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.3);
}

.card-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin: 0;
  color: var(--primary-green, #32cd32); 
}

.card-description {
  font-size: 0.95rem;
  color: var(--text-color-secondary, #cccccc);
  margin: 0;
}

.card-button {
  background-color: var(--primary-green, #32cd32);
  color: #ffffff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  align-self: flex-start;
  transition: background-color 0.2s ease;
}

.card-button:hover {
  background-color: #28a745;
}
</style>
