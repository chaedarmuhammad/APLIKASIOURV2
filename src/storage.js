// ========== STORAGE MODULE ==========
// Handles localStorage and IndexedDB persistence.
// IndexedDB provides a transparent backup layer that auto-restores
// if localStorage is cleared by the browser or user.

'use strict';

// ── IndexedDB Constants ──
var IDB_NAME = 'n5n4_backup';
var IDB_VERSION = 1;
var IDB_STORE = 'progress';
var _idb = null;
var _idbReady = false;
var _idbSaveTimer = null;
var IDB_DEBOUNCE_MS = 2000; // auto-save debounce: 2 seconds

// ── IndexedDB Functions ──

function idbOpen() {
  return new Promise(function(resolve) {
    if (!('indexedDB' in window)) { resolve(null); return; }
    var req = indexedDB.open(IDB_NAME, IDB_VERSION);
    req.onupgradeneeded = function(e) {
      var db = e.target.result;
      if (!db.objectStoreNames.contains(IDB_STORE)) {
        db.createObjectStore(IDB_STORE);
      }
    };
    req.onsuccess = function(e) { resolve(e.target.result); };
    req.onerror = function() { resolve(null); };
  });
}

function idbPut(db, key, val) {
  if (!db) return;
  try {
    var tx = db.transaction(IDB_STORE, 'readwrite');
    tx.objectStore(IDB_STORE).put(val, key);
  } catch(e) { /* silent */ }
}

function idbGet(db, key) {
  return new Promise(function(resolve) {
    if (!db) { resolve(undefined); return; }
    try {
      var tx = db.transaction(IDB_STORE, 'readonly');
      var req = tx.objectStore(IDB_STORE).get(key);
      req.onsuccess = function() { resolve(req.result); };
      req.onerror = function() { resolve(undefined); };
    } catch(e) { resolve(undefined); }
  });
}

/**
 * Schedule a debounced save of all progress data to IndexedDB.
 * Called automatically by lsSet() and periodically by the app.
 */
function idbScheduleSave() {
  if (!_idb) return;
  if (_idbSaveTimer) clearTimeout(_idbSaveTimer);
  _idbSaveTimer = setTimeout(function() {
    _idbSaveTimer = null;
    var snapshot = {
      n5prog: progress,
      n5stars: stars,
      n5srs: srs,
      savedAt: Date.now()
    };
    idbPut(_idb, 'all_progress', snapshot);
  }, IDB_DEBOUNCE_MS);
}

/**
 * Try to restore progress from IndexedDB if localStorage is empty.
 * This handles the case where a user clears browser data.
 */
async function idbTryRestore() {
  try {
    _idb = await idbOpen();
    if (!_idb) return;
    _idbReady = true;

    // Check if localStorage already has data
    var hasLS = localStorage.getItem('n5prog') !== null ||
                localStorage.getItem('n5srs') !== null;
    if (hasLS) return; // data exists — no restore needed

    // localStorage empty → try restore from IndexedDB
    var backup = await idbGet(_idb, 'all_progress');
    if (!backup || typeof backup !== 'object') return;

    if (backup.n5prog && Object.keys(backup.n5prog).length > 0) {
      progress = backup.n5prog;
      localStorage.setItem('n5prog', JSON.stringify(progress));
    }
    if (backup.n5stars && Object.keys(backup.n5stars).length > 0) {
      stars = backup.n5stars;
      localStorage.setItem('n5stars', JSON.stringify(stars));
    }
    if (backup.n5srs && Object.keys(backup.n5srs).length > 0) {
      srs = backup.n5srs;
      localStorage.setItem('n5srs', JSON.stringify(srs));
    }

    console.log('[IDB] Progress restored from IndexedDB backup (' +
      new Date(backup.savedAt).toLocaleString() + ')');
    showToast('Progres dipulihkan otomatis dari backup', 'success');
  } catch(e) {
    console.warn('[IDB] Restore failed:', e);
  }
}

// ── localStorage Helpers ──

function lsGet(key, def) {
  try { var v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : def; }
  catch(e) { return def; }
}

var _lsQuotaWarned = false;
function lsSet(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
    // Auto-save to IndexedDB (debounced)
    idbScheduleSave();
    return true;
  } catch(e) {
    if (!_lsQuotaWarned && (e.name === 'QuotaExceededError' || /quota/i.test(e.message||''))) {
      _lsQuotaWarned = true;
      try {
        alert('Penyimpanan browser hampir penuh. Silakan ekspor progres dari Beranda lalu hapus data lama.');
      } catch(_e) { /* silent */ }
    }
    // Fallback: save directly to IndexedDB
    idbScheduleSave();
    return false;
  }
}
