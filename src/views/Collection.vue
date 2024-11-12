<script setup lang="ts">
import cardList from '@/components/CardList.vue';

import { ref, onMounted } from 'vue'

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
</script>

<template>
  <div class="collection">
    <h1>Your Collection</h1>
    <card-list :cards="imageUrls"></card-list>
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
