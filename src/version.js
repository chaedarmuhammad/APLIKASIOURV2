// ========== VERSION & UPDATE MODULE ==========
// Manages app versioning, changelog, and update notifications.

'use strict';

var APP_VERSION = '2.1.0';
var APP_BUILD_DATE = '2026-05-16';
var APP_CHANGELOG = [
  { version: '2.1.0', date: '2026-05-16', changes: [
    'Modularisasi kode: split data & JS menjadi beberapa file',
    'Build script untuk minifikasi aset',
    'Perbaikan keamanan innerHTML dengan sanitasi',
    'Service Worker & Manifest dengan relative paths',
    'Unit tests untuk SRS/SM-2 logic',
    'Versioning system dengan update notification',
    'PNG icons untuk kompatibilitas iOS & Android',
    'Noscript fallback untuk browser tanpa JS',
    'Optimasi CSS: dynamic bab colors via JS',
    'IndexedDB auto-backup untuk data persistence'
  ]},
  { version: '2.0.0', date: '2025-01-01', changes: [
    'SM-2 Spaced Repetition System',
    'Flashcard Lintas Bab',
    'Kamus Kategori',
    'Rangkuman N5-N4',
    'PWA support dengan offline mode',
    'Export/Import progress'
  ]}
];

/**
 * Check if there's a new version since user's last visit.
 * Shows a non-intrusive toast if updated.
 */
function checkVersionUpdate() {
  var lastVersion = lsGet('n5_app_version', '');
  if (lastVersion && lastVersion !== APP_VERSION) {
    // Show update notification
    setTimeout(function() {
      showToast('Diperbarui ke v' + APP_VERSION + '!', 'success');
    }, 2000);
  }
  lsSet('n5_app_version', APP_VERSION);
}

/**
 * Get version info string for display.
 * @returns {string} Version string
 */
function getVersionString() {
  return 'v' + APP_VERSION + ' (' + APP_BUILD_DATE + ')';
}
