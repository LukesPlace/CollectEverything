<script setup lang="ts">
import CollectionItems from '@/components/CollectionItems.vue';
import { ref, onMounted } from 'vue'
import { useCollectionStore } from '@/stores/collection';

const collectionStore = useCollectionStore();
collectionStore.loadCollection();
// Dynamically import all images in a folder
const cards = import.meta.glob('@/assets/OpCards/*.png')

// Store image URLs
const imageUrls = ref<string[]>([])

// Load all images on mount
onMounted(async () => {
  const imports = Object.values(cards)
  const resolvedImages = await Promise.all(imports.map(img => img()))
  imageUrls.value = resolvedImages.map(module => module.default)
})

function onSaveCollection() {
  collectionStore.saveCollection();
}
</script>

<template>
  <div class="collection">
    <h1>Your Collection</h1>
    <button @click="onSaveCollection" class="primary-btn">Save Collection</button>
    <collection-items :cards="imageUrls"></collection-items>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .collection {
    width: 100%;
    min-height: 100vh;
    align-items: center;
  }
}
</style>
