<script setup lang="ts">
import CollectionItems from '@/components/CollectionItems.vue';
import { ref, type Ref, computed } from 'vue'
import { useCollectionStore, type CollectionItem } from '@/stores/collection';
import { storeToRefs } from 'pinia';
import { vAutoAnimate } from '@formkit/auto-animate/vue';

const props = defineProps<{
id: string,
}>();

const collectionStore = useCollectionStore();
collectionStore.loadCollection();

const collectionName: string = props.id;
const { collections } = storeToRefs(collectionStore)
const currentCollectionItems = collections.value?.find(c => c.name == collectionName)?.items;

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
    completed: false,
    imageBase64: null
  };

  currentCollectionItems?.push(newCollectionItem);
  collectionStore.saveCollection();
}
</script>

<template>
  <div class="collection">
    <div class="collection-header">
      <h1 :title="collectionName">Your {{ collectionName }}</h1>
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
    padding: 0 5%;
  }
}
  

.collection-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem; /* Adds space between elements */
  padding-bottom: 2rem;
}

.collection-header h1 {
  flex: 1; /* Allows h1 to grow but not take up the whole row */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}

.search-filter {
  flex: 1;
  max-width: 50%; /* Prevents search from growing too large */
}

.primary-btn {
  flex-shrink: 0; /* Keeps the button from being resized */
  white-space: nowrap;
}

</style>
