import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { slugify } from '@/utils/string';

export interface CollectionItem {
  id: string;
  name: string;
  description: string | null;
  tags: Array<string>;
  category: string | null;
  completed: boolean;
  imageBase64: string | null;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  items: Array<CollectionItem>;
}

interface CollectionState {
  collections: Array<Collection>;
  currentCollection: Collection | null;
  editingCardId: string | null;
}

export const useCollectionStore = defineStore('collection', {
  state: (): CollectionState => ({
    collections: JSON.parse(localStorage.getItem('collection') ?? '[]'),
    currentCollection: null,
    editingCardId: null,
  }),
  actions: {
    loadCollections() {
      const raw = localStorage.getItem('collection') ?? '[]';
      const collections: Collection[] = JSON.parse(raw);

      // Add slug to existing collections if missing
      this.collections = collections.map(c => ({
        ...c,
        slug: c.slug ?? slugify(c.name),
      }));
    },
    saveCollections() {
      localStorage.setItem('collection', JSON.stringify(this.collections));
    },
    renameCollection(id: string, newName: string) {
      const collection = this.collections.find(c => c.id === id);
      if (collection) {
        collection.name = newName;
        collection.slug = slugify(newName);
        this.saveCollections();
      } 
    },
    setCurrentCollectionBySlug(slug: string) {
      this.currentCollection = this.collections.find(c => c.slug === slug) ?? null;
    },

    addCollection(name: string) {
      const newCollection: Collection = {
        id: crypto.randomUUID(),
        name,
        slug: slugify(name),
        items: [],
      };
      this.collections.push(newCollection);
      this.currentCollection = newCollection;
      this.saveCollections();
      return newCollection;
    },

    addItemToCurrentCollection(itemData: Omit<CollectionItem, 'id'>) {
      if (!this.currentCollection) return null;

      const newItem: CollectionItem = {
        id: crypto.randomUUID(),
        ...itemData,
      };

      this.currentCollection.items.push(newItem);
      this.editingCardId = newItem.id; // Open modal for this card
      this.saveCollections();
      return newItem;
    },

    setEditingCard(cardId: string | null) {
      this.editingCardId = cardId;
    },

    updateItem(updatedItem: CollectionItem) {
      if (!this.currentCollection) return;

      const index = this.currentCollection.items.findIndex(i => i.id === updatedItem.id);
      if (index !== -1) {
        this.currentCollection.items[index] = updatedItem;
        this.saveCollections();
      }
    },
  },

  getters: {
    currentItems: (state) => state.currentCollection?.items ?? [],
    getItemById: (state) => (id: string) =>
      state.currentCollection?.items.find(i => i.id === id) ?? null,
  },
});
