import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface CollectionState {
  collections: Array<Collection> | null;
}

export interface Collection {
  id: string;
  name: string;
  items: Array<CollectionItem>;  
}

export interface CollectionItem {
  id: string;
  name: string;
  description: string | null;
  completed: boolean;
}
export const useCollectionStore = defineStore('collection', {
  state: (): CollectionState => ({
    collections: null,
    // ...
  }),
  actions: {
    loadCollection() { 
      // this.collection = localStorage.getItem('collection');
      this.collections = JSON.parse(localStorage.getItem('collection') ?? '');
    },
    saveCollection() {
      localStorage.collection = JSON.stringify(this.collections);
    },
  },
})