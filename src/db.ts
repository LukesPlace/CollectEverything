import { openDB } from 'idb';
import type { Collection, CollectionItem } from './stores/collection';

const DB_NAME = 'my-collections';
const DB_VERSION = 1;

export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('collections')) {
        db.createObjectStore('collections', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('images')) {
        db.createObjectStore('images'); // key = collectionItem.id, value = Blob
      }
    },
  });
};
