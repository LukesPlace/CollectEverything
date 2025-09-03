<script setup lang="ts">
import { type CollectionItem } from '@/stores/collection';
import CardDetails from './CardDetails.vue';
import { ref, type Ref } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

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
  <div @click="onShowCardDetails" :class="['card', { 'card-incomplete': !collectionItem.completed }]">
    <img :src="collectionItem.imageBase64 ?? 'https://via.placeholder.com/300x200'" alt="Card image" class="card-image" />
    <font-awesome-icon v-if="!collectionItem.completed" :icon="['fas', 'lock']" class="lock-icon" />
    <div class="card-content" :title="props.collectionItem.name ?? 'New item'">
      <h3 class="card-title">{{ props.collectionItem.name ?? 'New item'}}</h3>
      <div v-if="props.collectionItem.tags"> 
        <ul class="tags-list">
          <!-- Show first 2 tags -->
          <li
            v-for="(tag, index) in props.collectionItem.tags.slice(0, 2)"
            :key="index"
            class="tag"
          >
            <p>{{ tag }}</p>
          </li>

          <!-- If more than 2, show an ellipsis with tooltip -->
          <li
            v-if="props.collectionItem.tags.length > 2"
            class="tag tag-more"
            :title="props.collectionItem.tags.slice(2).join(', ')"
          >
            …
          </li>
        </ul>
      </div>
      <p class="card-description">{{ props.collectionItem.description }}</p>
    </div>
  </div>

  <card-details :is-visible="showCardDetails" :item="collectionItem" @save="onDialogSave" @close="onDialogClose"></card-details>
</template>

<style scoped>
@media (min-width: 1024px) {
  .card {
    height: 20rem;
    font-size: 1.25rem;
  }
  .card-title {
    font-size: 1.25rem;
    max-height: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

  }
  .card-description {
    /* adding elipsis to multi line. Cant use text-overflow elipsis due to whitespace no wrap */
    line-height: 1.4;
    max-height: 4.2em; 
    overflow: hidden;
    display: -webkit-box;
    line-clamp: 3;
    -webkit-line-clamp: 3; 
    -webkit-box-orient: vertical;
  }
}

@media (max-width: 1024px) {
  .card {
    height: 10rem;
  }

  .card-title {
    font-size: 0.8rem;
    max-height: 100%;
    /* adding elipsis to multi line. Cant use text-overflow elipsis due to whitespace no wrap */
    line-height: 1.4;
    max-height: 4.2em; 
    overflow: hidden;
    display: -webkit-box;
    line-clamp: 3;
    -webkit-line-clamp: 3; 
    -webkit-box-orient: vertical;
  }

  .card-description {
    display: none;
  }
}
.card {
  cursor: pointer;
  width: 300px;
  /* background-color: var(#1e1e1e);
  color: var(--text-color, #ffffff); */
  background-color: #f5f5f0;
  color:  #1e1e1e;
  border-radius: 12px;
  /* box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2); */
  box-shadow: 0 0 10px rgba(0, 255, 128, 0.2); /* subtle green glow */
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.card:hover {
  transform: translateY(-5px);
  /* box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.3); */
    box-shadow: 0 0 20px rgba(0, 255, 128, 0.4); /* stronger glow on hover */
}

.card-image {
  width: 100%;
  height: 50%;
  object-fit: cover;
}

.card-content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  height: 100%;
  color: #1e1e1e;
}

.card-title {
  font-weight: bold;
  margin: 0;
}

.card-description {
  font-size: 0.95rem;
  color: var(--text-color-secondary, var(--background-color));
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


.card-incomplete {
  background-color: #f0f0f0;
  color: #888888;
  filter: brightness(50%);
  position: relative;
}

.lock-icon {
  height: 5rem;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  color: rgba(0, 0, 0, 1);
  pointer-events: none;
  stroke: white;
  stroke-width: 10px;
  paint-order: stroke fill;
}

.lock-icon path {
  stroke: white;
  stroke-width: 2px;
  paint-order: stroke fill;
}

.tags-list {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.tag {
  background-color: var(--primary-green);
  color: white;
  padding: 0.3rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
  white-space: nowrap;
}

.tag-more {
  background-color: var(--primary-green);
  cursor: help;
}
</style>
