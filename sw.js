// ========== SERVICE WORKER — N5→N4 日本語 Flashcard ==========
// Provides offline support via Cache-First strategy for static assets
// and Network-First for dynamic content.

const CACHE_NAME = 'n5n4-flashcard-v2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/style.css',
  '/data.js',
  '/app.js',
  '/icon.svg',
  '/manifest.webmanifest'
];

// Google Fonts to cache
const FONT_URLS = [
  'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Noto+Serif+JP:wght@400;700&family=Outfit:wght@300;400;500;600;700&display=swap'
];

// Install: pre-cache static assets
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('[SW] Pre-caching static assets');
      return cache.addAll(STATIC_ASSETS).catch(function(err) {
        console.warn('[SW] Some assets failed to cache:', err);
        // Don't fail the install if some assets are missing
        return Promise.resolve();
      });
    }).then(function() {
      return self.skipWaiting();
    })
  );
});

// Activate: clean old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function(name) { return name !== CACHE_NAME; })
          .map(function(name) { 
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name); 
          })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// Fetch: Cache-First for static, Network-First for fonts
self.addEventListener('fetch', function(event) {
  const url = new URL(event.request.url);
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) return;
  
  // Google Fonts: Stale-While-Revalidate
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match(event.request).then(function(cached) {
          const fetchPromise = fetch(event.request).then(function(response) {
            if (response && response.status === 200) {
              cache.put(event.request, response.clone());
            }
            return response;
          }).catch(function() {
            return cached;
          });
          return cached || fetchPromise;
        });
      })
    );
    return;
  }
  
  // Local assets: Cache-First
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then(function(cached) {
        if (cached) return cached;
        return fetch(event.request).then(function(response) {
          // Cache successful responses
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        }).catch(function() {
          // Offline fallback for navigation
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
          return new Response('Offline', { status: 503, statusText: 'Offline' });
        });
      })
    );
    return;
  }
});

// Listen for skip-waiting message from client
self.addEventListener('message', function(event) {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
