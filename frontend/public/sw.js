// sw.js — Service Worker for caching Pyodide WASM assets & offline operations
const CACHE_NAME = 'codesahayak-offline-v1';

const PYODIDE_ASSETS = [
  'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js',
  'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.asm.js',
  'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.asm.wasm',
  'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.asm.data',
  'https://cdn.jsdelivr.net/pyodide/v0.25.0/full/repodata.json'
];

// Install Event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Pre-caching Pyodide assets...');
      return cache.addAll(PYODIDE_ASSETS).catch(err => {
        console.warn('[SW] Failed to pre-cache some assets (expected if offline during install):', err);
      });
    })
  );
  self.skipWaiting();
});

// Activate Event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[SW] Clearing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Cache First for Pyodide assets and standard static files, Network First for APIs
self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  
  // Skip API requests and non-GET requests
  if (url.includes('/api/') || event.request.method !== 'GET') {
    return;
  }

  // Pyodide CDN assets or standard fonts -> Cache First
  const isPyodideAsset = url.includes('cdn.jsdelivr.net/pyodide') || url.includes('jsdelivr.net/npm/@fontsource');
  
  if (isPyodideAsset) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          if (!networkResponse || networkResponse.status !== 200) {
            return networkResponse;
          }
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return networkResponse;
        });
      })
    );
  } else {
    // Network First / Stale While Revalidate fallback for standard assets
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          // If valid response, cache it
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Offline fallback
          return caches.match(event.request);
        })
    );
  }
});
