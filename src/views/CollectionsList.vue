<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { useCollectionStore, type Collection } from '@/stores/collection';
import ConfirmationDialog from '@/components/ConfirmationDialog.vue';

const showEditDialog: Ref<boolean> = ref(false);
const editingCollection: Ref<Collection | null> = ref(null);
const editingCollectionName: Ref<string | null> = ref(null);
const collectionStore = useCollectionStore();
collectionStore.loadCollection();
const collections: Array<Collection> | null  = collectionStore.collection ?? null;
console.log(collections);

function onEditCollection(collectionId: string) {
  editingCollection.value = collections?.find(c => c.id == collectionId) ?? null;
  editingCollectionName.value = editingCollection.value!.name;
  showEditDialog.value = true;
}

function onDeleteCollection(collectionId: string) {
  editingCollection.value = collections?.find(c => c.id == collectionId) ?? null;
  editingCollectionName.value = editingCollection.value!.name;
  showEditDialog.value = true;
}

function onDialogClose() {
  showEditDialog.value = false;
}

function onDialogSave() {
  editingCollection.value!.name = editingCollectionName.value!;
  showEditDialog.value = false;
  collectionStore.saveCollection();
}

function onDialogDelete() {
  const collectionToDelete = collections?.find(c => c.id == editingCollection.value?.id) ?? null;
  collectionStore.collection = collections?.filter(c => c.id !== collectionToDelete?.id)!;
  showEditDialog.value = false;
  collectionStore.saveCollection();
}
</script>

<template>
  <div class="collections">
    <h1 class="header">All Collections</h1>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th>Collection Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tr v-for="collection in collections">
          <td> {{ collection.name }}</td>
          <td class="actions">
            <button @click="onEditCollection(collection.id)" class="primary-btn">Edit</button>
            <button @click="onDeleteCollection(collection.id)" class="delete-btn">Delete</button>
          </td>
        </tr>
        <tr>
          <td colspan="2" class="add-new">
            <button class="primary-btn">Add new</button>
          </td>
        </tr>
      </table>
    </div>
  </div>
  <confirmation-dialog title="Edit collection" :show="showEditDialog" @close="onDialogClose" @save="onDialogSave">
    <div>
      <span>Collection Name</span>
      <input type="text" v-model="editingCollectionName">
    </div>
  </confirmation-dialog>
  <confirmation-dialog title="Delete collection?" :show="showEditDialog" :is-delete-dialog="true" @close="onDialogClose" @delete="onDialogDelete">
    <div>
      <span>Really delete this collection {{ editingCollectionName }}</span>
    </div>
  </confirmation-dialog>
</template>

<style>
.header {
  padding-bottom: 2rem;
}
@media (min-width: 1024px) {
  .collections {
    width: 100%;
    min-height: 100vh;
    align-items: center;
    padding-left: 5%;
  }
}

.actions {
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
</style>
