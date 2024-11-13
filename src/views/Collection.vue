<script setup lang="ts">
import CollectionItems from '@/components/CollectionItems.vue';
import { ref, onMounted, type Ref, computed } from 'vue'
import { useCollectionStore, type CollectionItem } from '@/stores/collection';
import router from '@/router';
import { storeToRefs } from 'pinia';
import { vAutoAnimate } from '@formkit/auto-animate/vue';

const collectionStore = useCollectionStore();
collectionStore.loadCollection();

const collectionId = router.currentRoute.value.params.id;
const { collections } = storeToRefs(collectionStore)
const currentCollectionItems = collections.value?.find(c => c.name == collectionId)?.items;
// const filteredCollectionItems: Ref<Array<CollectionItem> | null> = ref(currentCollectionItems ?? null);

const filteredCollectionItems = computed(()=> {
  if (!filterValue.value)
    return currentCollectionItems;

  return currentCollectionItems?.filter(c => c.name.toLowerCase().includes(filterValue.value!.toLowerCase()) || c.description?.toLowerCase().includes(filterValue.value!.toLowerCase()));
  
})
const filterValue: Ref<string | null> = ref(null);

function onNewCollectionItem() {
  const newCollectionItem: CollectionItem = { 
    id: crypto.randomUUID(),
    name: 'New collection item',
    description: null,
    completed: false
  };

  currentCollectionItems?.push(newCollectionItem);
  collectionStore.saveCollection();
}
</script>

<template>
  <div class="collection">
    <div class="collection-header">
      <h1>Your Collection</h1>
      <div class="search-filter">
        <input v-model="filterValue" type="text" placeholder="Search by name or description...">
      </div>
      <button @click="onNewCollectionItem" class="primary-btn">Create new Item</button>
    </div>
    <collection-items :items="filteredCollectionItems ?? []" v-auto-animate></collection-items>
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

.collection-header {
  display: flex;
  justify-content: space-between;
  padding-bottom: 2rem;
}
.search-filter {
  width: 50%;
} 
</style>
