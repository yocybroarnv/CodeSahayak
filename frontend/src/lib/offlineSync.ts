/**
 * Offline Synchronization Service
 * Manages browser IndexedDB for offline access and queues progress to sync when online
 */

const DB_NAME = 'CodeSahayakDB';
const DB_VERSION = 1;

let dbInstance: IDBDatabase | null = null;

export function initOfflineDB(): Promise<IDBDatabase> {
  if (dbInstance) return Promise.resolve(dbInstance);

  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error('IndexedDB open error:', request.error);
      reject(request.error);
    };

    request.onsuccess = () => {
      dbInstance = request.result;
      resolve(dbInstance);
    };

    request.onupgradeneeded = (_event: IDBVersionChangeEvent) => {
      const db = request.result;
      
      // Store problems and curriculum details
      if (!db.objectStoreNames.contains('challenges')) {
        db.createObjectStore('challenges', { keyPath: 'id' });
      }
      
      if (!db.objectStoreNames.contains('syllabus')) {
        db.createObjectStore('syllabus', { keyPath: 'code' });
      }
      
      // Queue offline progress reports
      if (!db.objectStoreNames.contains('progressQueue')) {
        db.createObjectStore('progressQueue', { autoIncrement: true });
      }
    };
  });
}

// Save contents for offline caching
export async function cacheOfflineData(storeName: 'challenges' | 'syllabus', items: any[]): Promise<void> {
  const db = await initOfflineDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);

    items.forEach((item) => {
      store.put(item);
    });

    transaction.oncomplete = () => resolve();
    transaction.onerror = () => reject(transaction.error);
  });
}

// Retrieve cached elements
export async function getCachedOfflineData(storeName: 'challenges' | 'syllabus'): Promise<any[]> {
  const db = await initOfflineDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const store = transaction.objectStore(storeName);
    const request = store.getAll();

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

// Queue progress updates when offline
export async function queueOfflineProgress(data: {
  concept: string;
  language: string;
  isCorrect: boolean;
  hintsUsed: number;
}): Promise<void> {
  const db = await initOfflineDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction('progressQueue', 'readwrite');
    const store = transaction.objectStore('progressQueue');
    const request = store.add({ ...data, timestamp: new Date() });

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
}

// Sync local queued progress changes with the Node.js Express server
export async function syncOfflineProgressWithServer(): Promise<number> {
  if (!navigator.onLine) return 0;
  
  const db = await initOfflineDB();
  const tx = db.transaction('progressQueue', 'readwrite');
  const store = tx.objectStore('progressQueue');
  
  const items: any[] = await new Promise((resolve) => {
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result);
  });

  if (items.length === 0) return 0;

  const VITE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
  let syncCount = 0;

  for (const item of items) {
    try {
      const response = await fetch(`${VITE_API_URL}/progress/track`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Note: Token header will be attached in client or resolved via session cookie
        },
        body: JSON.stringify({
          concept: item.concept,
          language: item.language,
          isCorrect: item.isCorrect,
          hintsUsed: item.hintsUsed || 0,
        }),
      });

      if (response.ok) {
        syncCount++;
      }
    } catch (err) {
      console.error('Failed to sync offline item:', err);
    }
  }

  // Clear synchronized entries
  return new Promise((resolve) => {
    const clearTx = db.transaction('progressQueue', 'readwrite');
    const clearStore = clearTx.objectStore('progressQueue');
    clearStore.clear();
    clearTx.oncomplete = () => resolve(syncCount);
  });
}

// Trigger automatic synchronization on network online trigger
if (typeof window !== 'undefined') {
  window.addEventListener('online', async () => {
    console.log('Network online restored. Synchronizing offline local queue...');
    const synced = await syncOfflineProgressWithServer();
    if (synced > 0) {
      console.log(`Successfully synchronized ${synced} offline progress reports!`);
    }
  });
}
