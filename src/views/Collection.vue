<script setup lang="ts">
import CollectionItems from '@/components/CollectionItems.vue';
import { ref, computed, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import ProgressBar from '@/components/ProgressBar.vue';
import ToggleButton from '@/components/ToggleButton.vue';
import CardDetails from '@/components/CardDetails.vue';
import { useCollections, type CollectionItem } from '@/composables/useCollections';

const props = defineProps<{ slug: string }>();

const route = useRoute();
const { collections, addCollection, addItemToCollection } = useCollections();

const filterValue = ref<string | null>(null);
const showAll = ref(true);
const showCardDetails = ref(false);
const collectionItem = ref<CollectionItem | null>(null);

const currentCollection = computed(() =>
  collections.value.find(c => c.slug === (route.params.slug ?? props.slug))
);

const currentCollectionItems = computed(() => currentCollection.value?.items ?? []);

const filteredCollectionItems = computed(() => {
  let items = currentCollectionItems.value;

  if (!showAll.value) items = items.filter(item => item.completed);

  if (!filterValue.value) return items;

  const search = filterValue.value.toLowerCase();
  return items.filter(item =>
    item.name.toLowerCase().includes(search) ||
    item.description?.toLowerCase().includes(search) ||
    item.tags?.some(tag => tag.toLowerCase().includes(search)) ||
    item.category?.toLowerCase().includes(search)
  );
});

function onNewCollectionItem() {
  addItemToCollection(props.slug, {
    name: 'New collection item',
    description: null,
    completed: false,
    imageBase64: null,
    tags: [],
    category: null,
  });
  showCardDetails.value = true;
}

function createNewCollection() {
  addCollection('My New Collection');
}

function onDialogClose() {
  showCardDetails.value = false;
  collectionItem.value = null;
}

function onDialogSave() {
  showCardDetails.value = false;
  collectionItem.value = null;
}

function onOpenCard(editingCard: CollectionItem) {
  collectionItem.value = editingCard;
  showCardDetails.value = true;
}

watch(() => route.params.slug, () => {});
</script>

<template>
  <div class="collection">
    <div class="collection-header">
      <h1 class="collection-title" :title="currentCollection?.slug">Your {{ currentCollection?.name }}</h1>
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
    max-width: 50%;
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
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}

.primary-btn {
  flex-shrink: 0;
  white-space: nowrap;
}

</style>
