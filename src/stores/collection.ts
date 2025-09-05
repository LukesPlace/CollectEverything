import { defineStore } from 'pinia';
import { slugify } from '@/utils/string';
import { useCollections, type Collection, type CollectionItem } from '@/composables/useCollections';

const {
  collections,
  addCollection: addCollectionToDb,
  addItemToCollection: addItemToCollectionInDb,
  saveCollection: saveCollectionInDb,
  removeCollection: removeCollectionFromDb,
} = useCollections();

export const useCollectionStore = defineStore('collection', {
  state: () => ({
    editingCardId: null as string | null,
  }),

  actions: {
    async addCollection(name: string) {
      const newCollection = await addCollectionToDb(name);
      return newCollection;
    },
    async addItemToCollection(slug: string, itemData: Omit<CollectionItem, 'id'>) {
      const newItem = await addItemToCollectionInDb(slug, itemData);
      return newItem;
    },

    async renameCollection(collection: Collection, newName: string) {
      collection.name = newName;
      collection.slug = slugify(newName);
      await saveCollectionInDb(collection);
    },

    async updateItem(collection: Collection, updatedItem: CollectionItem) {
      const index = collection.items.findIndex(i => i.id === updatedItem.id);
      if (index !== -1) {
        collection.items[index] = updatedItem;
        await saveCollectionInDb(collection);
      }
    },

    async removeCollection(id: string) {
      await removeCollectionFromDb(id);
    },

    setEditingCard(cardId: string | null) {
      this.editingCardId = cardId;
    },
  },

  getters: {
    getItemById: () => (collection: Collection, id: string) =>
      collection.items.find(i => i.id === id) ?? null,

    allCollections: () => collections.value,
  },
});
