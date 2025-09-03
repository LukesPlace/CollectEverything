<script setup lang="ts">
  import { ref, type Ref } from 'vue';
  import { useCollectionStore, type Collection } from '@/stores/collection';
  import ConfirmationDialog from '@/components/ConfirmationDialog.vue';
  import { storeToRefs } from 'pinia';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import router from '@/router';
  import ProgressBar from '@/components/ProgressBar.vue';

  const showEditDialog: Ref<boolean> = ref(false);
  const showDeleteDialog: Ref<boolean> = ref(false);
  const editingCollection: Ref<Collection | null> = ref(null);
  const editingCollectionName: Ref<string | null> = ref(null);
  const collectionStore = useCollectionStore();
  collectionStore.loadCollections();
  const { collections } = storeToRefs(collectionStore)

  function onEditCollection(collectionId: string) {
    editingCollection.value = collections.value?.find(c => c.id == collectionId) ?? null;
    editingCollectionName.value = editingCollection.value!.name;
    showEditDialog.value = true;
  }

  function onDeleteCollection(collectionId: string) {
    editingCollection.value = collections.value?.find(c => c.id == collectionId) ?? null;
    editingCollectionName.value = editingCollection.value!.name;
    showDeleteDialog.value = true;
  }

  function onDialogClose() {
    showEditDialog.value = false;
    showDeleteDialog.value = false;
  }

  function onDialogSave() {
    editingCollection.value!.name = editingCollectionName.value!;
    showEditDialog.value = false;
    collectionStore.saveCollections();
  }

  function onDialogDelete() {
    const collectionToDelete = collections?.value?.find(c => c.id == editingCollection.value?.id) ?? null;
    collectionStore.collections = collections?.value?.filter(c => c.id !== collectionToDelete?.id)!;
    showDeleteDialog.value = false;
    collectionStore.saveCollections();
  }

  function onAddNewCollection() {
    const newCollection: Collection = { 
      id: crypto.randomUUID(),
      name: 'New Collection',
      items: []
    }
    collections.value?.push(newCollection);
    collectionStore.saveCollections();
  }

  function onRowClick(url: string) {
    router.push(url);
  }
</script>

<template>
  <div class="collections">
    <h1 class="header">All Collections</h1>
    <button @click="onAddNewCollection" class="mobile primary-btn">Add new</button>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th class="collection-name-header">Collection Name</th>
            <th class="progress-bar-header"></th>
            <th class="actions-header">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="collection in collections" :key="collection.id" class="clickable-row">
            <td class="collection-name" @click="onRowClick(`/collection/${collection.name}`)">{{ collection.name }}</td>
            <td><progress-bar :completed-items="collection.items?.filter(c => c.completed == true).length ?? 0" :total-items="collection.items?.length ?? 0"> </progress-bar></td>
            <td class="actions">
              <button @click="onEditCollection(collection.id)" class="primary-btn"><font-awesome-icon :icon="['fas', 'pen']" /></button>
              <!-- <button @click="onDeleteCollection(collection.id)" class="delete-btn">Delete</button> -->
              <button @click="onDeleteCollection(collection.id)" class="delete-btn delete-icon"><font-awesome-icon :icon="['fas', 'trash']" /></button>
            </td>
          </tr>
          <tr key="newRow">
            <td colspan="3" class="add-new">
              <button @click="onAddNewCollection" class="primary-btn">Add new</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
  <confirmation-dialog title="Edit collection" :show="showEditDialog" @close="onDialogClose" @save="onDialogSave">
    <div>
      <span class="default-text">Collection Name</span>
      <input type="text" v-model="editingCollectionName">
    </div>
  </confirmation-dialog>
  <confirmation-dialog title="Delete collection?" :show="showDeleteDialog" :is-delete-dialog="true" @close="onDialogClose" @delete="onDialogDelete">
    <div>
      <span class="default-text">Really delete this collection <strong class="emphasis-text">{{ editingCollectionName }}</strong>?</span>
    </div>
  </confirmation-dialog>
</template>

<style>

.header {
  padding: 0 5%;
  padding-bottom: 2rem;
}

@media (min-width: 767px) {

  .mobile {
    display: none;
  }

  .collections {
    width: 100%;
    min-height: 100vh;
    align-items: center;
    padding-left: 5%;
  }


.collection-name {
  font-weight: bold;
}

.progress-bar-header {
  min-width: 8rem;
}


.actions-header {
  text-align: center;
}

.actions {
  align-items: center;
  justify-content: center;
  display: flex;
  gap: 1rem;
}

.add-new {
  text-align: center;
}
.add-new-btn {
  background: none;
  border: none;
  font-size: 1.2em;
  cursor: pointer;
  color:white;
}

.clickable-row:hover {
  cursor: pointer;
}
}

/* Mobile styles */
@media (max-width: 767px) {
  /* Stack table rows as individual cards */
  thead {
    display: none;
  }
  table {
    background-color: var(--color-background);
  }

  .collections {
    text-align: center;
  }

  .mobile {
    margin-bottom: 2rem;
  }
  .add-new {
    display: none;
  }

  .table-container table {
    display: block;
    border: 0;
  }

  .clickable-row {
    display: block;
    background-color: var(--color-background-mute);
    border: 1px solid var(--primary-green);
    border-radius: 8px;
    margin-bottom: 1rem;
    padding: 1rem;
  }

  .clickable-row td {
    display: flex;
    align-items: center;
    padding: 0.5rem 0;
  }

  .collection-name {
    font-size: 1.2rem;
    font-weight: bold;
  }

  .progress-bar-header,
  .actions-header {
    display: none; /* Hide headers */
  }

  /* Progress bar styling */
  .clickable-row td:nth-child(2) {
    margin-top: 0.5rem;
  }

  .actions {
    margin-top: 0.5rem;
    width: 100%;
    justify-content: space-between;
  }

  /* Add new row on mobile */
  .add-new {
    text-align: center;
    padding: 1rem 0;
  }

  .primary-btn, .delete-btn {
    font-size: 1rem;
    padding: 0.5rem 1rem;
  }
}
</style>
