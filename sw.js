const CACHE_NAME = 'calc-v2';
const ASSETS = [
  'index.html',
  'style.css',
  'script.js',
  'manifest.json'
];

// Instalacja i zapisywanie plików do pamięci offline
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Aktywacja nowego Service Workera
self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Przechwytywanie żądań - najpierw sprawdź pamięć podręczną (Cache), potem sieć
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(event.request);
    })
  );
});
