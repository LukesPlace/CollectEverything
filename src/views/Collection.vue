<script setup lang="ts">
  import CollectionItems from '@/components/CollectionItems.vue';
  import { ref, type Ref, computed } from 'vue'
  import { useCollectionStore, type Collection, type CollectionItem } from '@/stores/collection';
  import { storeToRefs } from 'pinia';
  import ProgressBar from '@/components/ProgressBar.vue';
  import ToggleButton from '@/components/ToggleButton.vue';
  import CardDetails from '@/components/CardDetails.vue';

  const props = defineProps<{
    id: string,
  }>();

  const collectionStore = useCollectionStore();

  const collectionName: string = props.id;
  const { collections } = storeToRefs(collectionStore);
  const currentCollectionItems = collections.value?.find(c => c.name == collectionName)?.items;

  const filterValue: Ref<string | null> = ref(null);
  const showAll: Ref<boolean> = ref(true);
  const showCardDetails: Ref<boolean> = ref(false);
  const collectionItem: Ref<CollectionItem | null> = ref(null);

  const filteredCollectionItems = computed(()=> {
    let currentFilteredItems = currentCollectionItems;

    if (!showAll.value)
      currentFilteredItems = currentFilteredItems?.filter(f => f.completed === true);

    if (!filterValue.value)
      return currentFilteredItems;

    return currentFilteredItems?.filter(c => c.name.toLowerCase().includes(filterValue.value!.toLowerCase()) || c.description?.toLowerCase().includes(filterValue.value!.toLowerCase()) || c.tags?.includes(filterValue.value!));
  });

  function onNewCollectionItem() {
    const newCollectionItem: CollectionItem = { 
      id: crypto.randomUUID(),
      name: 'New collection item',
      description: null,
      completed: false,
      imageBase64: null,
      tags: [],
      category: null,
    };

    currentCollectionItems?.push(newCollectionItem);
    collectionStore.saveCollections();

    // Open dialog immediately
    collectionItem.value = newCollectionItem;
    showCardDetails.value = true;
  }

  function onDialogClose() {
    showCardDetails.value = false;
    collectionItem.value = null;
  }

  function onDialogSave() {
    showCardDetails.value = false;
    collectionItem.value = null;
    collectionStore.saveCollections();
  }
  
  function onOpenCard(editingCard: CollectionItem) {
    collectionItem.value = editingCard;
    showCardDetails.value = true;
  }
</script>

<template>
  <div class="collection">
    <div class="collection-header">
      <h1 class="collection-title" :title="collectionName">Your {{ collectionName }}</h1>
      <toggle-button v-model="showAll" unchecked-state="Show missing?" checked-state="Hide missing?">Show missing?</toggle-button>
      <div class="search-filter">
        <input v-model="filterValue" type="text" placeholder="Search by name or description...">
      </div>
      <button @click="onNewCollectionItem" class="primary-btn">Create new Item</button>
    </div>
    <progress-bar :completed-items="filteredCollectionItems?.filter(c => c.completed == true).length ?? 0" :total-items="filteredCollectionItems?.length ?? 0"> </progress-bar>
    <collection-items :items="filteredCollectionItems ?? []" @open="onOpenCard"></collection-items>
  </div>
  <card-details v-if="collectionItem" :is-visible="showCardDetails" :item="collectionItem" @save="onDialogSave" @close="onDialogClose"></card-details>
</template>

<style>

@media (min-width: 1024px) {
  .collection-header {
    flex-direction: row;
  }

  .search-filter {
    flex: 1;
    max-width: 50%; /* Prevents search from growing too large */
  }

}
@media (max-width: 1024px) {
  .collection-header {
   flex-direction: column; 
  }

  .search-filter {
    flex: 1;
    width: 100%;
  }
}

.collection {
  width: 100%;
  min-height: 100vh;
  align-items: center;
  padding: 0 5%;
}

.collection-title {
  width: 100%;
}

.collection-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding-bottom: 2rem;
}

.collection-header h1 {
  flex: 1; /* Allows h1 to grow but not take up the whole row */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}

.primary-btn {
  flex-shrink: 0; /* Keeps the button from being resized */
  white-space: nowrap;
}

</style>
