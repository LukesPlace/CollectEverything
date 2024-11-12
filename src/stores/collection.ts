import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

interface CollectionState {
  collection: Array<Collection> | null;
}

export interface Collection {
  id: string;
  name: string;
  items: Array<CollectionItem>;  
}

interface CollectionItem {
  id: string;
  name: string;
  completed: boolean;
}
export const useCollectionStore = defineStore('collection', {
  state: (): CollectionState => ({
    collection: null,
    // ...
  }),
  actions: {
    loadCollection() { 
      // this.collection = localStorage.getItem('collection');
      this.collection = JSON.parse(localStorage.getItem('collection') ?? '');
    },
    saveCollection() {
      localStorage.collection = JSON.stringify(this.collection);
    },
  },
})