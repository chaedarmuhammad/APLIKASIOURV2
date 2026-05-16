// ========== SERVICE WORKER — N5→N4 日本語 Flashcard ==========
// Provides offline support via Cache-First strategy for static assets
// and Network-First for dynamic content.
//
// NOTE: Uses relative paths so the app works whether deployed at root (/)
// or in a subdirectory (e.g., /APLIKASIOURV2/ on GitHub Pages).

const CACHE_NAME = 'n5n4-flashcard-v2.2.0';
const SW_SCOPE = self.registration ? self.registration.scope : self.location.href.replace(/sw\.js.*$/, '');

// Static assets to pre-cache (relative to SW scope)
const STATIC_ASSETS = [
  './',
  './index.html',
  './style.css',
  './data-n5.js',
  './data-n4.js',
  './data.js',
  './src/utils.js',
  './src/bab-colors.js',
  './src/storage.js',
  './src/srs.js',
  './src/version.js',
  './src/export-import.js',
  './src/navigation.js',
  './src/ui-study.js',
  './src/ui-kamus.js',
  './src/ui-rangkuman.js',
  './app.js',
  './icon.svg',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './manifest.webmanifest'
];

// Google Fonts to cache
const FONT_URLS = [
  'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;400;500;700&family=Noto+Serif+JP:wght@400;700&family=Outfit:wght@300;400;500;600;700&display=swap'
];

// Install: pre-cache static assets
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('[SW] Pre-caching static assets (v2.2.0)');
      // Cache each asset individually to avoid failing all if one is missing
      return Promise.allSettled(
        STATIC_ASSETS.map(function(url) {
          return cache.add(url).catch(function(err) {
            console.warn('[SW] Failed to cache:', url, err.message);
          });
        })
      );
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

// Fetch: Cache-First for static, Stale-While-Revalidate for fonts
self.addEventListener('fetch', function(event) {
  var url = new URL(event.request.url);
  
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip chrome-extension and other non-http(s) requests
  if (!url.protocol.startsWith('http')) return;
  
  // Google Fonts: Stale-While-Revalidate
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith(
      caches.open(CACHE_NAME).then(function(cache) {
        return cache.match(event.request).then(function(cached) {
          var fetchPromise = fetch(event.request).then(function(response) {
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
  
  // Local assets: Cache-First with network fallback
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request).then(function(cached) {
        if (cached) return cached;
        return fetch(event.request).then(function(response) {
          // Cache successful responses
          if (response && response.status === 200) {
            var responseClone = response.clone();
            caches.open(CACHE_NAME).then(function(cache) {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        }).catch(function() {
          // Offline fallback for navigation
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
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
