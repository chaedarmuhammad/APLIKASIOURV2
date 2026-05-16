// ========== DATA LOADER ==========
// This file combines data-n5.js (Bab 1-35) and data-n4.js (Bab 36-78)
// into the unified BABS array used by the app.
//
// NOTE: data-n5.js defines `const BABS` (N5 data, Bab 1-35)
//       data-n4.js defines `const BABS_N4` (N4 data, Bab 36-78)
//
// After both are loaded, this script merges them into BABS.
// For backward compatibility, BABS remains a single global array.

// Merge N4 data into BABS (loaded from data-n5.js)
if (typeof BABS_N4 !== 'undefined' && Array.isArray(BABS_N4)) {
  BABS.push(...BABS_N4);
}

// Freeze to prevent accidental mutation
Object.freeze(BABS);
