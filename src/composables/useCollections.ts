import { ref, watch, toRaw } from 'vue';
import { openDB, type DBSchema, type IDBPDatabase } from 'idb';

export interface CollectionItem {
  id: string;
  name: string;
  description?: string | null;
  tags?: string[];
  category?: string | null;
  completed: boolean;
  imageBase64?: string | null;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  items: CollectionItem[];
}

interface CollectionDB extends DBSchema {
  collections: {
    key: string;
    value: Collection;
  };
}

let db: IDBPDatabase<CollectionDB> | null = null;

export function useCollections() {
  const collections = ref<Collection[]>([]);
  let isInitialized = false;

  async function initDB() {
    if (isInitialized) return;
    db = await openDB<CollectionDB>('collections-db', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('collections')) {
          db.createObjectStore('collections', { keyPath: 'id' });
        }
      },
    });
    collections.value = await db.getAll('collections');
    isInitialized = true;
  }

  initDB();

  function getCollection(slug: string | undefined) {
    if (!slug) return null;
    return collections.value.find(c => c.slug === slug) ?? null;
  }

  async function saveCollection(collection: Collection) {
    if (!db) return;
    const plainCollection = toRaw(collection);
    await db.put('collections', plainCollection);

    const index = collections.value.findIndex(c => c.id === collection.id);
    if (index !== -1) collections.value[index] = plainCollection;
    else collections.value.push(plainCollection);
  }

  async function addCollection(name: string) {
    const newCollection: Collection = {
      id: crypto.randomUUID(),
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      items: [],
    };
    await saveCollection(newCollection);
    return newCollection;
  }

  async function addItemToCollection(
    slug: string,
    item: Omit<CollectionItem, 'id'>
  ) {
    const collection = getCollection(slug);
    if (!collection) return null;

    const newItem: CollectionItem = { ...item, id: crypto.randomUUID() };
    collection.items.push(newItem);
    await saveCollection(collection);
    return newItem;
  }

  async function removeCollection(id: string) {
    if (!db) return;
    await db.delete('collections', id);
    collections.value = collections.value.filter(c => c.id !== id);
  }

  /** Auto-save on changes */
  watch(
    collections,
    async (val) => {
      for (const col of val) {
        await saveCollection(col);
      }
    },
    { deep: true }
  );

  return {
    collections,
    getCollection,
    initDB,
    addCollection,
    addItemToCollection,
    saveCollection,
    removeCollection,
  };
}
